export interface Topic {
  id: string;
  tab: string;
  title: boolean;
  author_id: string;
  author: Author;
  content?: string;
  good?: boolean;
  top?: boolean;
  visit_count?: number;
  reply_count?: number;
  last_reply_at: string;
  create_at: string;
}

export interface Article extends Topic {
  is_collect: boolean;
  replies: Comment[];
}

export interface ArticleLink {
  author: Author;
  id: string;
  last_reply_at: string;
  title: string;
}

export interface Author {
  avatar_url: string;
  loginname: string;
}

export interface Comment {
  id: string;
  content: string;
  author: Author;
  is_uped: boolean;
  create_at: string;
  reply_id?: string;
  ups?: Array<string>;
}