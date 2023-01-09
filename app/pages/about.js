import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>Amazed.DEV - O mnie</title>
      </Head>
      <div className="container-content">
        <div className="about">
          <h1 className="post-title">O mnie</h1>
          <p>
            Komercyjnie programuję od 5 lat ale przygodę z programowaniem
            rozpoczołem juz na studiach (Geofizyka na Akademi Górniczo-Hutniczej
            w Krakowie), gdzie miałem dość sporo doczyienia z Pythonem oraz
            zagadnieniami przetwarzania i analizy danych.
            <br />
            <br />
            Jako osoba bez wykształcenia IT cały czas czuję potrzebę poszerzania
            wiedzy i rozwoju w tej branży, do której wszedłem dość późno. Stąd
            też pomysł bloga pisanego w pierwszej osobie, będącego niejako
            zapisem notatek z procesu nauki. Tak naprawde opisuje tu
            powtarzajęce się w mojej pracy problemy, oraz to jak je rozwiązać.
            Każdy artykuł pisany jest jako przepis jak napisać konkretny
            fragment aplikacji lub jako opis technologi którą chcę utrwalić.
          </p>

          <h3>Języki programowania</h3>
          <span className="tech-icons">
            <i class="devicon-typescript-plain" title="TypeScript"></i>
            <i class="devicon-javascript-plain" title="Javacript"></i>
            <i class="devicon-go-plain" title="Golang"></i>
            <i class="devicon-python-plain" title="Python"></i>
            {/* <i class="devicon-lua-plain"></i> */}
          </span>
          <p>
            Programuję obecnie prawie wyłącznie w TypeScript i JavaScript. Jest
            to głównie kod backendowy, sporadycznie praca z frontendowymi
            frameworkami lub jakieś proste skrypty czy CLI. W prywatnych
            projektach staram się jednak pisać dużo w Golang'u i jest to
            zdecydowanie język, a który chciał bym się w jakimś stopniu
            przesiąść również w pracy zawodowej.
            <br />
            Wcześniej sporo programowałem również w Pythonie. Pracowałem przy
            przetwarzaniu i analizie danch, ale również pisałem serwisy i
            narzędzia w postaci skryptów.
          </p>

          <h3>Technologie backendowe</h3>
          <span className="tech-icons">
            <i class="devicon-nodejs-plain" title="Node"></i>
            <i class="devicon-nestjs-plain" title="Nest"></i>
            <img src="/images/rabbitmq.png" title="RabbitMQ" />
            <img src="/images/lambda.png" title="AWS Lambda" />
            {/* <i class="devicon-graphql-plain"></i> */}
            <i class="devicon-mongodb-plain" title="MongoDB"></i>
            <i class="devicon-postgresql-plain" title="Postgres"></i>
            <i class="devicon-redis-plain" title="Redis"></i>
          </span>
          <p>
            Majwiecej ostatnio doczynienia mam z microservisami zbudowanymi w
            Nest.JS, komunikującymi się poprzez RabbitMQ. Pracuję z systemami
            rozproszonymi, opartymi mi. o DDD, rzadziej TDD, ale również
            bardziej wyspecjalizowanymi pomocniczymi narzędziami czy
            bibliotekami.
            <br />
            Bardzo lubię również pracę z systemami opartymi o serverless (nie
            framework a podejście!).
            <br />
            Pracuję lub pracowałem zarówno z relacyjnymi jak i nierelacyjnymi
            bazami danych. Najwięcej doświadczenia zdobyłem w pracy z MongoDB
            oraz z silnikiem wyszukiwań Elasticseach.
          </p>

          <h3>Infrastruktura</h3>
          <span className="tech-icons">
            <i class="devicon-amazonwebservices-original" title="AWC Cloud"></i>
            <i class="devicon-terraform-plain" title="Terraform"></i>
            <i class="devicon-docker-plain" title="Docker"></i>
            {/* <i class="devicon-kubernetes-plain"></i>
          <i class="devicon-ansible-plain"></i> */}
            <i class="devicon-raspberrypi-line" title="RaspberryPI"></i>
          </span>
          <p>
            Zarówno zadania komercyjne jak i prywatne projekty staram się zawsze
            budować z myślą o chmurze. Stąd też swoją pracę i rozwój opieram o
            technologie związane z komercyjną chmurą obliczeniową AWS,
            konteneryzacją i podejściem do opisywania infrastruktury jako kodu
            (IaaC).
            <br />
            W projektach poza samym Dockerem i Terraformem używam podejść CI/CD,
            głównie opartych o Gitlab-CI i GithubActions, żadziej Jenkins. W
            najbliśzym czasie szczególnie zamierzam się skupić na zagadnieniach
            związanych z Kubernetesem i pogłębić wiedzę na temat AWS.
            <br />W wolnych chwilach sporo czasu poświęcam projektom opartym o
            platformę RaspberryPI, głównie w zagadnieniach związanych z
            networkingiem i DevOps.
          </p>
        </div>
      </div>
    </>
  );
}
