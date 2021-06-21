export type Photo = {
  id: number;
  width: number;
  height: number;
  urls: { full: string; regular: string; raw: string; small: string; thumb: string };
  color: string | null;
  user: {
    first_name: string;
    last_name: string;
  };
  alt_description: string;
  author: string
};
