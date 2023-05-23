import { MemberInterface } from "@/types/members";
import fs from "fs";
import grayMatter from "gray-matter";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse";
import { unified } from "unified";

/**
 * Get all members from Markdown posts
 * @returns members
 */
export const getMembers = async (): Promise<MemberInterface[]> => {
  // Get files from members directory
  const files = fs.readdirSync(`app/_members`);

  // Loop through files and create array of members
  const members = files.map(async (filename) => {
    // Get raw markdown
    const markdownWithMetadata = fs
      .readFileSync(`app/_members/${filename}`)
      .toString();

    // Parse markdown, grab front matter
    const { data, content } = grayMatter(markdownWithMetadata);

    // Process front matter
    const slug = filename.replace(".md", "");
    const path = `/members/${slug}`;

    // Process custom fields
    const { name, linkedin, github, twitter, website, added, affiliation, level } = data;

    // Parse Markdown
    const html = await unified()
      .use(remarkParse)
      .use(remarkHtml)
      .process(content);
    const bio = html.value.toString();

    // Return member data
    return {
      name,
      linkedin,
      github,
      twitter,
      website,
      added,
      affiliation,
      level,
      slug,
      path,
      bio,
    };
  });

  // Return all members
  return Promise.all(members);
};

/**
 * Get a member by slug
 * @param slug
 * @returns member
 */
export const getMemberBySlug = async (slug: string) => {
  const members = await getMembers();
  const member = members.find((member) => member.slug === slug);
  return member;
};
