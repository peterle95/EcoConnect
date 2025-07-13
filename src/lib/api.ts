// A fake API client. In a real app, this would be making network requests.

export type Organization = {
  id: string;
  name: string;
  description: string;
  image: string;
  hint: string;
  tags: string[];
};

export type FeedItem = {
  id: number;
  name: string;
  avatar: string;
  handle: string;
  time: string;
  content: string;
  image?: string;
  imageHint?: string;
  likes: number;
  comments: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export async function getOrganizations(): Promise<Organization[]> {
  console.log('Fetching organizations...');
  // In a real app, you would fetch this from a server.
  // For now, we return an empty array.
  return [];
}

export async function getFeedItems(): Promise<FeedItem[]> {
  console.log('Fetching feed items...');
  // In a real app, you would fetch this from a server.
  return [];
}

export async function getCurrentUser(): Promise<User | null> {
  console.log('Fetching current user...');
  // In a real app, you would fetch this from a server.
  return null;
}
