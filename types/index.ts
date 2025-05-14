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
  user: {
    username: string;
  };
  _count: {
    likes: number;
  };
};

export type UserType = {
  // id: number;
  image: {
    png: string;
    webp: string;
  };
  username: string;
};
