import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';


const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData(justPrevNextId = null) {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.mdx$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });

  allPostsData.sort(({ order: a }, { order: b }) => { // Sort posts by date //not date, order 
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
  if (justPrevNextId !== null) {
    let prevNext = { prev: null, next: null }
    allPostsData.forEach((elem, i) => {
      if (elem.id == justPrevNextId) {
        const next = (allPostsData[i - 1] === undefined) ? null : allPostsData[i - 1].id
        const prev = (allPostsData[i + 1] === undefined) ? null : allPostsData[i + 1].id
        prevNext = { prev, next}
      }
    })
    return prevNext
  }
  else
    return allPostsData
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  const pathTr = fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.mdx$/, '')
      },
      locale: 'tr'
    };
  });
  const pathEn = fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.mdx$/, '')
      },
      locale: "en"
    };
  });
  return [...pathEn, ...pathTr]
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Combine the data with the id and contentHtml
  return {
    id,
    ...matterResult.data,
    contentOfMdx :  matterResult.content
  };
}