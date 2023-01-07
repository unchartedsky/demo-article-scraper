// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ArticleData, extract } from '@extractus/article-extractor';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse<ArticleData>) {
  const { url } = req.body;
  if (url) {
    extract(url as string)
      .then((article) => res.status(200).json(article))
      .catch((err) => console.error(err));
  }
}
