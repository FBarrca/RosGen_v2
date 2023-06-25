

import Konva from 'konva';

// Find konva element by id
export const findKonva = (id: string, stage: Konva.Stage): Konva.Node => {
    if (!stage) return;
    const konva = stage.findOne(`#${id}`);
    // return konva element if found
    if (konva) return konva;
      console.error(`Konva element with id ${id} not found`);
      return;
    
  }