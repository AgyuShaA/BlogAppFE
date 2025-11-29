'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { useTileStore } from '@/store/useTileStore'

import { UpdateTileModal } from '../modals/update-modal'
import ViewTile from './tile-admin-card'
import { DeleteTileModal } from '../modals/delete-modal'
import CreatePostForm from './form'

type ModalType = 'view' | 'edit' | 'create' | 'delete' | null

interface Props {
  modal: ModalType
  selectedId: number | null
  onClose: () => void
}

export default function TileModals({ modal, selectedId, onClose }: Props) {
  const tile = useTileStore((s) => s.tiles.find((t) => t.id === selectedId))

  return (
    <Dialog open={!!modal} onOpenChange={onClose}>
      <DialogContent className='max-w-xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>
            {modal === 'create' && 'Create Tile'}
            {modal === 'view' && tile?.name}
            {modal === 'edit' && `Edit: ${tile?.name}`}
          </DialogTitle>
        </DialogHeader>

        {modal === 'delete' && <DeleteTileModal tile={tile} onClose={onClose} />}

        {modal === 'create' && <CreatePostForm onClose={onClose} />}

        {modal === 'view' && tile && <ViewTile tile={tile} />}

        {modal === 'edit' && tile && <UpdateTileModal tile={tile} onClose={onClose} />}
      </DialogContent>
    </Dialog>
  )
}
