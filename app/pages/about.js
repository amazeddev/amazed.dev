import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>Amazed.DEV - O mnie</title>
      </Head>
      <div className="container-content">
        <h1 className="post-title">O mnie</h1>
        <p>
          Programuję komercyjnie od 3 lat. Przygodę z programowaniem rozpoczołem
          juz na studiach (Geofizyka na Akademi Górniczo-Hutniczej w Krakowie),
          gdzie miałem dość sporo doczyienia z Pythonem oraz zagadnieniami
          przetwarzania i analizy danych. Studia nie mogłem niestety znaleźć
          pewnego, a co najważniejsze satysfakcjonujace zmnie zatrudnienia w
          zawodzie, więc postanowiłem spróbować w IT.
        </p>
      </div>
    </>
  );
}
