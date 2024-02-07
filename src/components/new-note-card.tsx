import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

type NewNoteCardProps = { onNoteCreated: (content: string) => void };

let speechRecognition: SpeechRecognition | null = null;

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [content, setContent] = useState("");

  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
    if (event.target.value === "") setShouldShowOnboarding(true);
  }

  function handleStartRecording() {
    const isSpeechRecognitionAPIAvailable =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

    if (!isSpeechRecognitionAPIAvailable) {
      toast.info("Infelizmente seu navegador não suporta a API de gravação :(");
      return;
    }

    setIsRecording(true);
    setShouldShowOnboarding(false);

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    speechRecognition = new SpeechRecognitionAPI();
    speechRecognition.lang = "pt-BR";
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = event => {
      const transcription = Array.from(event.results).reduce(
        (text, result) => text.concat(result[0].transcript),
        "",
      );
      setContent(transcription);
    };
    speechRecognition.onerror = event => console.log(event);
    speechRecognition.start();
  }

  function handleStopRecording() {
    setIsRecording(false);
    speechRecognition?.stop();
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault();
    onNoteCreated(content);
    toast.success("Nota criada com sucesso!");
    setContent("");
    setShouldShowOnboarding(true);
  }

  return (
    <Dialog.Root
      onOpenChange={open => {
        if (!open) {
          setContent("");
          setShouldShowOnboarding(true);
        }
      }}
    >
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
        <Dialog.Content className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-zinc-700 md:rounded-md flex flex-col outline-none overflow-hidden">
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
                  <button
                    type="button"
                    onClick={handleStartRecording}
                    className="font-medium text-pink-400 hover:underline"
                  >
                    gravando uma nota
                  </button>{" "}
                  em áudio ou se preferir{" "}
                  <button
                    type="button"
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
                  value={content}
                  onChange={handleContentChanged}
                  className="text-sm leading-6 text-zinc-400 bg-transparent resize-none flex-1 outline-none"
                />
              )}
            </div>

            {isRecording ? (
              <button
                type="button"
                onClick={handleStopRecording}
                className="w-full py-4 bg-zinc-800 text-center text-sm text-pink-400 outline-none font-medium hover:bg-pink-400 hover:text-pink-950 flex items-center justify-center gap-2"
              >
                <div className="size-3 rounded-full bg-red-600 animate-pulse" />
                Gravando! (clique para salvar)
              </button>
            ) : (
              <>
                {!isRecording && content && (
                  <button
                    type="submit"
                    className="w-full py-4 bg-pink-400 text-center text-sm text-pink-950 outline-none font-medium hover:bg-pink-500"
                  >
                    Salvar nota
                  </button>
                )}
              </>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
