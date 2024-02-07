import logo from "./assets/logo.svg";
import { NoteCard } from "./components/note-card";

export function App() {
  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} alt="Expert Notes" />

      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-zinc-500 outline-none"
        />
      </form>

      <div className="h-px bg-zinc-700" />

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <div className="rounded-md bg-zinc-700 p-5 space-y-3">
          <span className="text-sm font-medium text-zinc-200">
            Adicionar uma nota
          </span>
          <p className="text-sm leading-6 text-zinc-400">
            Grave uma nota em áudio que será convertida para texto
            automaticamente.
          </p>
        </div>

        <NoteCard note={{ date: new Date(), content: "Hello!" }} />
      </div>
    </div>
  );
}
