export interface TentHttp {
  player: string,
  character: string,
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
