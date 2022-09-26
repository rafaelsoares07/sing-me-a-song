import { faker } from "@faker-js/faker";

export function createRec() {
  const recommendation = {
    name: faker.music.songName(),
    youtubeLink: "https://www.youtube.com/watch?v=z4HihGFLEdM",
  };

  const recommendationValid = {
    id: 1,
    ...recommendation,
    score: 0,
  };

  return recommendationValid
}