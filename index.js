const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db'); // for queries

// Middleware
app.use(cors());
app.use(express.json()); //req.body

// ROUTES

// Create reptile
app.post('/reptile', async (req, res) => {
    try {
        console.log(req.body);
        const {name, description, type, image} = req.body;
        const newReptile = await pool.query(
            "INSERT INTO reptileWithImage (name, description, type, image) VALUES($1, $2, $3, $4) RETURNING *",
            [name, description, type, image]
        );
        res.json(newReptile.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

// Get all reptiles
app.get('/reptiles', async (req, res) => {
    try {
       const allReptiles = await pool.query("SELECT * FROM reptileWithImage");
       res.json(allReptiles.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// Get a reptile

app.get("/reptile/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const reptile = await pool.query("SELECT * FROM reptileWithImage WHERE reptile_id = $1", [
        id
      ]);
  
      res.json(reptile.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  // Update a reptile
  
  app.put("/reptile/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const {name, description, type, image} = req.body;
      const updateReptile = await pool.query(
        "UPDATE reptileWithImage SET name = $1 description = $2 type = $3 image = $4 WHERE reptile_id = $5",
        [name, description, type,  image, id]
      );
      res.json("Reptile was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //delete a todo
  
  app.delete("/reptile/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteReptile = await pool.query("DELETE FROM reptileWithImage WHERE reptile_id = $1", [
        id
      ]);
      res.json("Reptile was deleted!");
    } catch (err) {
      console.log(err.message);
    }
  });
app.listen(5001, ()=> {
    console.log('server has started on port 5000');
});