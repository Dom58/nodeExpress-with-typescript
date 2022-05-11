import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import helmet from "helmet";
import bodyParser from 'body-parser';

dotenv.config();

const port = process.env.PORT;

const app: Express = express();
app.use(cors());

export interface Items {
  item: {
  id: number
  name: string;
  price: number;
  description: string;
  image: string;}[]
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

// app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Express + TypeScript Server APIs',
    data: items
  });
});

app.post("/create", async (req: Request, res: Response) => {
  try {
    const item: Item = req.body;
    items.push(item);
    res.status(201).json({data: items});
  } catch (e: any) {
    res.json(req.body);
  }
});

app.get("/items/:id", async (req: Request, res: Response) => {  
  try {
    const id: Id['id'] = parseInt(req.params.id);
    const findItem = items.find(itm => itm.id === id);
    if(!findItem) {
      return res.json({error: 'No  data'})
    }
    return res.json(findItem);
  } catch (e: any) {
    res.json({error: e});
  }
});

app.delete("/items/:id", async (req: Request, res: Response) => {  
  try {
    const id: Id['id'] = parseInt(req.params.id);
    
    const findItem = items.find(itm => itm.id === id);
    if(!findItem) {
      return res.json({error: 'No data'})
    }

    delete items[findItem.id];

    return res.json({"message": 'Item deleted successfully',});
  } catch (e: any) {
    res.json({error: e});
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
