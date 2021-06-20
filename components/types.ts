export type Photo = {
  id: number;
  width: number;
  height: number;
  urls: { full: string; regular: string; raw: string; small: string; thumb: string };
  color: string | null;
  user: {
    username: string;
    name: string;
  };
};
