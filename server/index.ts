import express, { Request, Response } from 'express';
import { HierarchyService } from '../src/services/hierarchyService';

const app = express();
app.use(express.json());

const service = new HierarchyService();

app.post('/hierarchies', (req: Request, res: Response) => {
  const id = service.createHierarchy();
  res.status(201).json({ hierarchyId: id });
});

app.post('/hierarchies/:hid/nodes', (req: Request, res: Response) => {
  const { hid } = req.params;
  const { parentId, type, name, number, address } = req.body;
  try {
    const nodeId = service.addNode(hid, parentId, { type, name, number, address });
    res.status(201).json({ nodeId });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/hierarchies/:hid/nodes/:id/stores', (req: Request, res: Response) => {
  const { hid, id } = req.params;
  try {
    const stores = service.listStores(hid, id);
    res.json({ stores });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
