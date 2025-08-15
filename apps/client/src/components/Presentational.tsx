import {
  createPhrase,
  deletePhrase,
  getPhrases,
  updatePhrase,
} from "@/services/phrases";
import { useGetPhrases } from "@/services/phrases/usePhrases";

export const Presentational = () => {
  const { data, isLoading } = useGetPhrases();
  return (
    <div>
      <button
        onClick={async () => {
          const response = await getPhrases({
            limit: 1,
            pageNumber: 1,
          });
          console.log(response);
        }}
      >
        getPhrases
      </button>
      <button
        onClick={async () => {
          const response = await updatePhrase({
            id: "689f6d9c3d9effc819c0b002",
            phrase: "nueva frase actualizada desde la web",
          });
          console.log(response);
        }}
      >
        updatePhrase
      </button>

      <button
        onClick={async () => {
          const response = await createPhrase("frases y frases y mas frases");
          console.log(response);
        }}
      >
        createPhrase
      </button>
      <button
        onClick={async () => {
          const response = await deletePhrase("689f6d9c3d9effc819c0b002");
          console.log(response);
        }}
      >
        deletePhrase
      </button>
    </div>
  );
};
