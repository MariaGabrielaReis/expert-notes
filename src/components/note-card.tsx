import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { X } from "lucide-react";

type NoteCardProps = {
  note: { date: Date; content: string };
};

export function NoteCard({ note }: NoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="text-left flex flex-col rounded-md bg-zinc-800 p-5 gap-3 outline-none hover:ring-2 hover:ring-zinc-600 focus-visible:ring-2 focus-visible:ring-pink-400 overflow-hidden">
        <span className="text-sm font-medium text-zinc-300">
          {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}
        </span>
        <p className="text-sm leading-6 text-zinc-400">{note.content}</p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-zinc-700 rounded-md flex flex-col outline-none overflow-hidden">
          <Dialog.Close className="absolute right-0 top-0 p-4 text-zinc-400 hover:text-zinc-100">
            <X className="size-6" />
          </Dialog.Close>

          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-sm font-medium text-zinc-300">
              {formatDistanceToNow(note.date, {
                locale: ptBR,
                addSuffix: true,
              })}
            </span>
            <p className="text-sm leading-6 text-zinc-400">{note.content}</p>
          </div>

          <button
            type="button"
            className="w-full py-4 bg-zinc-800 text-center text-sm text-zinc-300 outline-none font-medium group"
          >
            Deseja{" "}
            <span className="text-red-500 group-hover:underline">
              apagar essa nota
            </span>
            ?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
