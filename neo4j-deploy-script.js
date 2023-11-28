//-------------------------------------------------------------
//  deploy phase: deploy the final aggrigated date on Neo4j server
const neo4j = require("neo4j-driver");
require('dotenv').config();

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
);
const session = driver.session();
const items = require("./items-with-relations/final-items-with-relations.json");

// Function to create items and relationships in Neo4j
async function createItemsAndRelationships() {
  try {
    // Create items and relationships
    for (const item of items) {
      await session.run(
        `CREATE (i:Item { name: $name, mainCatagory: $mainCatagory, subCatagory: $subCatagory, 
            itemURL: $itemURL, thumbnailURL: $thumbnailURL, goldCost: $goldCost })`,
        item
      );

      // Create "isMadeOf" relationships
      if (item.isMadeOf && item.isMadeOf.length > 0) {
        for (const ingredient of item.isMadeOf) {
          await session.run(
            `MATCH (source:Item { name: $name }), (target:Item { name: $ingredient })
               CREATE (source)-[:isMadeOf]->(target)`,
            { name: item.name, ingredient }
          );
        }
      }

      // Create "canMake" relationships
      if (item.canMake && item.canMake.length > 0) {
        for (const craftedItem of item.canMake) {
          await session.run(
            `MATCH (source:Item { name: $name }), (target:Item { name: $craftedItem })
               CREATE (source)-[:canMake]->(target)`,
            { name: item.name, craftedItem }
          );
        }
      }
    }

    console.log("Items and relationships created successfully.");
  } finally {
    await session.close();
    await driver.close();
  }
}

// Call the function to create items and relationships
createItemsAndRelationships();
