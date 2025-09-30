import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

interface DeleteLocationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locationName: string;
  onConfirm: () => void;
}

export function DeleteLocationDialog({
  open,
  onOpenChange,
  locationName,
  onConfirm,
}: DeleteLocationDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>地点を削除しますか？</AlertDialogTitle>
          <AlertDialogDescription>
            「{locationName}」をお気に入り地点から削除します。
            この操作は取り消すことができません。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={onConfirm}
          >
            削除
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}