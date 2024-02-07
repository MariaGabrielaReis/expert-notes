import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";

export function NewNoteCard() {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
  const [content, setContent] = useState("");

  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
    if (event.target.value === "") setShouldShowOnboarding(true);
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault();
    console.log(content);
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="text-left flex flex-col rounded-md bg-zinc-700 p-5 gap-3 outline-none hover:ring-2 hover:ring-zinc-600 focus-visible:ring-2 focus-visible:ring-pink-400 overflow-hidden">
        <span className="text-sm font-medium text-zinc-200">
          Adicionar uma nota
        </span>
        <p className="text-sm leading-6 text-zinc-400">
          Grave uma nota em áudio que será convertida para texto
          automaticamente.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-zinc-700 rounded-md flex flex-col outline-none overflow-hidden">
          <Dialog.Close className="absolute right-0 top-0 p-4 text-zinc-400 hover:text-zinc-100">
            <X className="size-6" />
          </Dialog.Close>
          <form onSubmit={handleSaveNote} className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-zinc-300">
                Adicione uma nota
              </span>

              {shouldShowOnboarding ? (
                <p className="text-sm leading-6 text-zinc-400">
                  Comece{" "}
                  <button className="font-medium text-pink-400 hover:underline">
                    gravando uma nota
                  </button>{" "}
                  em áudio ou se preferir{" "}
                  <button
                    onClick={() => setShouldShowOnboarding(false)}
                    className="font-medium text-pink-400 hover:underline"
                  >
                    utilize apenas texto
                  </button>
                  .
                </p>
              ) : (
                <textarea
                  autoFocus
                  onChange={handleContentChanged}
                  className="text-sm leading-6 text-zinc-400 bg-transparent resize-none flex-1 outline-none"
                />
              )}
            </div>

            <button
              type="button"
              className="w-full py-4 bg-pink-400 text-center text-sm text-pink-950 outline-none font-medium hover:bg-pink-500"
            >
              Salvar nota
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
