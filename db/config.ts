import { defineDb, defineTable, column } from 'astro:db';

const Groups = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
  }
});

const Plants = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    groupId: column.text({ references: () => Groups.columns.id }),
    scientificName: column.text(),
    family: column.text({ optional: true }),
    commonName: column.text(),
    imageUrl: column.text({ optional: true }),
    
    // Location
    latitude: column.number({ optional: true }),
    longitude: column.number({ optional: true }),

    // Structured ID Features
    leafArrangement: column.text({ optional: true }),
    leafMargin: column.text({ optional: true }),
    leafShape: column.text({ optional: true }),
    leafBase: column.text({ optional: true }),
    leafApex: column.text({ optional: true }),
    bark: column.text({ optional: true }),
    flower: column.text({ optional: true }),
    fruit: column.text({ optional: true }),
  }
});

export default defineDb({
  tables: {
    Groups,
    Plants,
  }
});
