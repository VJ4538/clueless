# clueless

## Run the frontend

```bash
cd apps/frontend
# install dependencies
npm install
# run the frontend
npm run dev
```

## Run the backend

```bash
cd apps/backend
# install dependencies ( Assuming we will add more dependencies in the future )
pip install -r requirements.txt
# run the backend
uvicorn main:app --reload
```

## API doc

API doc is available after you run the backend service at:

```bash
open http://127.0.0.1:8000/docs
```
