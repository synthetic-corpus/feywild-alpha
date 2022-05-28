export interface TentWeb {
  web_element_id: string,
  player: string,
  character: string,
  initiative: number,
  spell_dc?: number,
  passive_perception: number,
  ac: number,
  notes?: string
}

export interface TentPatch {
  player?: string,
  character?: string,
  initiative?: number,
  spell_dc?: number,
  passive_perception?: number,
  ac?: number,
  notes?: string
}
