export interface TentWeb {
  web_element_id: String,
  player: String,
  character: String,
  initiative: number,
  spell_dc?: number,
  passive_perception: number,
  ac: number,
  notes?: string
}

export interface TentPatch {
  player?: String,
  character?: String,
  initiative?: number,
  spell_dc?: number,
  passive_perception?: number,
  ac?: number,
  notes?: string
}
