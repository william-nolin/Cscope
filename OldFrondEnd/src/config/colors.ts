import { ReactElement } from "react"
import { ChangeType } from "../interface"

type shape = 'circle' | 'cross' | 'diamond' | 'square' | 'star' | 'triangle' | 'wye' | ReactElement | Function

export interface Color {
  type: string
  change_type: ChangeType
  label: string
  color: string
  shape: shape
}

export const default_color : Color = {
  type: 'other',
  change_type: ChangeType.UNKNOWN,
  label: 'Autre',
  color: '#666699',
  shape: 'wye'
}

export const fill_colors : Color[] = [
  {
    type: 'source',
    change_type: ChangeType.ADD,
    label: 'Source ajoutée',
    color: '#3333ff',
    shape: 'circle'
  },
  {
    type: 'documentation',
    change_type: ChangeType.ADD,
    label: 'Documentation ajoutée',
    color: '#cc00cc',
    shape: 'circle'
  },
  {
    type: 'data',
    change_type: ChangeType.ADD,
    label: 'Données ajoutées',
    color: '#cc0000',
    shape: 'circle'
  },
  {
    type: 'database',
    change_type: ChangeType.ADD,
    label: 'Base de données ajoutée',
    color: '#cc9900',
    shape: 'circle'
  },
  {
    type: 'test',
    change_type: ChangeType.ADD,
    label: 'Test ajouté',
    color: '#009933',
    shape: 'circle'
  },
  {
    type: 'source',
    change_type: ChangeType.MODIFY,
    label: 'Source modifiée',
    color: '#3333ff',
    shape: 'triangle'
  },
  {
    type: 'documentation',
    change_type: ChangeType.MODIFY,
    label: 'Documentation modifiée',
    color: '#cc00cc',
    shape: 'triangle'
  },
  {
    type: 'data',
    change_type: ChangeType.MODIFY,
    label: 'Données modifiées',
    color: '#cc0000',
    shape: 'triangle'
  },
  {
    type: 'database',
    change_type: ChangeType.MODIFY,
    label: 'Base de données modifiée',
    color: '#cc9900',
    shape: 'triangle'
  },
  {
    type: 'test',
    change_type: ChangeType.MODIFY,
    label: 'Test modifié',
    color: '#009933',
    shape: 'triangle'
  },
  {
    type: 'source',
    change_type: ChangeType.DELETE,
    label: 'Source supprimée',
    color: '#3333ff',
    shape: 'cross'
  },
  {
    type: 'documentation',
    change_type: ChangeType.DELETE,
    label: 'Documentation supprimée',
    color: '#cc00cc',
    shape: 'cross'
  },
  {
    type: 'data',
    change_type: ChangeType.DELETE,
    label: 'Données supprimées',
    color: '#cc0000',
    shape: 'cross'
  },
  {
    type: 'database',
    change_type: ChangeType.DELETE,
    label: 'Base de données supprimée',
    color: '#cc9900',
    shape: 'cross'
  },
  {
    type: 'test',
    change_type: ChangeType.DELETE,
    label: 'Test supprimé',
    color: '#009933',
    shape: 'cross'
  }, 
  {
    type: 'source',
    change_type: ChangeType.RENAME,
    label: 'Source renommée',
    color: '#3333ff',
    shape: 'star'
  },
  {
    type: 'documentation',
    change_type: ChangeType.RENAME,
    label: 'Documentation renommée',
    color: '#cc00cc',
    shape: 'star'
  },
  {
    type: 'data',
    change_type: ChangeType.RENAME,
    label: 'Données renommées',
    color: '#cc0000',
    shape: 'star'
  },
  {
    type: 'database',
    change_type: ChangeType.RENAME,
    label: 'Base de données renommée',
    color: '#cc9900',
    shape: 'star'
  },
  {
    type: 'test',
    change_type: ChangeType.RENAME,
    label: 'Test renommé',
    color: '#009933',
    shape: 'star'
  }, 
]