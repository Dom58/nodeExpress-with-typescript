import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import cookieParser from 'cookie-parser';

dotenv.config();

const port = process.env.PORT || 8000;

const app: Express = express();
app.use(cors());

export interface Items {
  item: {
    id: number
    name: string;
    price: number;
    description: string;
    image: string;
  }[]
}

export interface Item {
  id: number
  name: string;
  price: number;
  description: string;
  image: string;
}

interface Id {
  id: number
}

const items: Items["item"] = [];

app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());

const url = process.env.THIRD_PART_API || 'http://localhost:4000/api/cdn/v1/profile';
const payload = {
  platform: "web",
  websiteId: "BPW-123",
  campaign: "",
};

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Express + TypeScript Server APIs',
    data: items
  });
});

app.post("/profile", async (req: Request, res: Response) => {
  fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Credentials': 'true'
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      // Set the booletteProof User as an HTTP-only cookie to be used on the server side
      res.cookie('bp_user', data.userId, { httpOnly: true });
      res.status(201).json({ message: 'UserId saved to the cookie', data });
    })
    .catch((error) => {
      console.error("Error creating user:", error);
    });
});

app.get("/cookie/check-user", async (req: Request, res: Response) => {
  // Verify the user from the request cookie
  const bp_user_cookied = req.cookies?.bp_user;
  if (!bp_user_cookied) {
    // 1. return res.status(401).json({ error: 'Unauthorized: User not exist in the cookie' });
    // 2. set bg_user_2 if not exist
    fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Credentials': 'true'
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        // Set the booletteProof User as an HTTP-only cookie to be used on the server side
        res.cookie('bp_user', data.userId, { httpOnly: true });
        res.status(201).json({ message: 'UserId saved to the cookie', data });
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  } else {
    res.status(200).json({ message: 'User retrieved from the cookie', userId: bp_user_cookied });
  }
});

// Error handling to catch 404
app.all('*', (_req, res) => {
  res.status(404).json({
    error: 'address Not found',
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
