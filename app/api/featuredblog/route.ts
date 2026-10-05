import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";

const RSS_URL = "https://freeflowcreativehub.substack.com/feed";

export async function GET() {
  try {
    const response = await fetch(RSS_URL, {
      next: {
        revalidate: 3600, // Cache for 1 hour
      },
      headers: {
        Accept: "application/rss+xml, application/xml, text/xml",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch RSS feed: ${response.status} ${response.statusText}`
      );
    }

    const xml = await response.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      cdataPropName: "__cdata",
      textNodeName: "#text",
      parseTagValue: false,
      trimValues: true,
    });

    const data = parser.parse(xml);

    const items = data?.rss?.channel?.item ?? [];
    const itemArray = Array.isArray(items) ? items : [items];

    // Take only the latest 3 items
    const posts = itemArray.slice(0, 3).map((item: any) => {
      const title = cleanText(item.title);
      const summary = cleanText(item.description);

      const rawPost =
        typeof item["content:encoded"] === "object"
          ? item["content:encoded"]?.__cdata ??
            item["content:encoded"]?.["#text"] ??
            ""
          : item["content:encoded"] ?? "";

      const post = removeImages(rawPost);

      const image =
        item.enclosure?.["@_url"] ??
        extractFirstImage(rawPost) ??
        null;

      const pubDate = item.pubDate
        ? new Date(item.pubDate)
        : null;

      // Extract hashtags as categories from content (or fall back to item.category)
      const categories = extractHashtags(rawPost, item.category);

      return {
        title,
        summary,
        post,
        categories,
        image,
        date: pubDate ? formatDate(pubDate) : null,
        time: pubDate ? formatTime(pubDate) : null,
        publishedAt: pubDate?.toISOString() ?? null,
        url: item.link ?? null,
        author: cleanText(item["dc:creator"]),
      };
    });

    return NextResponse.json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    console.error("Blog RSS error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to retrieve blog posts",
      },
      { status: 500 }
    );
  }
}

/**
 * Extract unique hashtags from post HTML content.
 * Falls back to RSS category or "General" if no hashtags are present.
 */
function extractHashtags(htmlContent: string, fallbackCategoryData?: any): string[] {
  if (!htmlContent) return getFallbackCategories(fallbackCategoryData);

  // Strip HTML tags so attributes/links aren't parsed as hashtags
  const plainText = htmlContent.replace(/<[^>]*>/g, " ");

  // Match hashtags (e.g. #creativewriting, #cw6, #OriginalityMatters)
  const matches = plainText.match(/#([a-zA-Z0-9_]+)/g);

  if (matches && matches.length > 0) {
    // Deduplicate and strip leading '#' symbol
    const uniqueTags = Array.from(
      new Set(matches.map((tag) => tag.replace("#", "").trim()))
    );

    return uniqueTags.length > 0 ? uniqueTags : getFallbackCategories(fallbackCategoryData);
  }

  return getFallbackCategories(fallbackCategoryData);
}

/**
 * Helper to retrieve category or fall back to "General".
 */
function getFallbackCategories(categoryData: any): string[] {
  const category = extractCategory(categoryData);
  return category ? [category] : ["General"];
}

function extractCategory(categoryData: any): string {
  if (!categoryData) return "General";

  if (typeof categoryData === "string") {
    return cleanText(categoryData) || "General";
  }

  if (Array.isArray(categoryData) && categoryData.length > 0) {
    const firstCat = categoryData[0];
    if (typeof firstCat === "string") return cleanText(firstCat) || "General";
    if (typeof firstCat === "object") {
      const val = firstCat.__cdata ?? firstCat["#text"] ?? "";
      return cleanText(val) || "General";
    }
  }

  if (typeof categoryData === "object") {
    const val = categoryData.__cdata ?? categoryData["#text"] ?? "";
    return cleanText(val) || "General";
  }

  return "General";
}

/**
 * Remove images from the article HTML.
 */
function removeImages(html: string): string {
  if (!html) return "";

  return html
    .replace(
      /<div[^>]*class=["'][^"']*captioned-image-container[^"']*["'][^>]*>[\s\S]*?<\/div>\s*<\/div>/gi,
      ""
    )
    .replace(/<picture[\s\S]*?<\/picture>/gi, "")
    .replace(/<img\b[^>]*>/gi, "")
    .replace(/<figure[\s\S]*?<\/figure>/gi, "")
    .trim();
}

/**
 * Extract the first image from HTML content if enclosure is unavailable.
 */
function extractFirstImage(html: string): string | null {
  if (!html) return null;

  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);

  return match?.[1] ?? null;
}

/**
 * Convert RSS title/description/CDATA to clean text.
 */
function cleanText(value: any): string {
  if (!value) return "";

  const text =
    typeof value === "object"
      ? value.__cdata ?? value["#text"] ?? ""
      : String(value);

  return text
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Format date in a readable form.
 */
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Lagos",
  }).format(date);
}

/**
 * Format publication time.
 */
function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("en-NG", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Africa/Lagos",
  }).format(date);
}