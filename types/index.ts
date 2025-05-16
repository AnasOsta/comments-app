import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
  circleColor?: string;
  checkColor?: string;
};

export type CommentType = {
  id: string;
  content: string;
  createdAt: string;
  parentId: string | null;
  parentUsername: string | null;
  user: {
    username: string;
  };
  likes: number;
  replies: CommentType[];
};

export type UserType = {
  // id: number;
  image: {
    png: string;
    webp: string;
  };
  username: string;
};
