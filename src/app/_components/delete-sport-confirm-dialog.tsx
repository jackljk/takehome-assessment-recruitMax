import { type Sport } from '@/api/sports';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface DeleteSportConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sportToDelete: Sport | null;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteSportConfirmDialog = ({
  open,
  onOpenChange,
  sportToDelete,
  isDeleting,
  onConfirm,
  onCancel,
}: DeleteSportConfirmDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Confirm <span className="capitalize">{sportToDelete}</span>{' '}
            Deletion
          </DialogTitle>
          <DialogDescription>
            By deleting <span className="capitalize">{sportToDelete}</span>,
            you will unsubscribe from all the colleges you subscribed to for
            this sport.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1"
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
