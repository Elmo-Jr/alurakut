import React from "react";
import nookies from "nookies";
import jwt from "jsonwebtoken";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
import { RecadosBoxWrapper } from "../src/components/Recados";

function ProfileSidebar(propriedades) {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${propriedades.githubUser}.png`}
        style={{ borderRadius: "8px" }}
      />
      <hr />

      <p>
        <a
          className="boxLink"
          href={`https://github.com/${propriedades.githubUser}`}
        >
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default function Home(props) {
  const usuarioAleatorio = props.githubUser;
  const [comunidades, setComunidades] = React.useState([]);
  const [recados, setRecados] = React.useState([]);

  const pessoasFavoritas = [
    "juunegreiros",
    "omariosouto",
    "peas",
    "marcobrunodev",
    "rafaballerini",
    "elmo-jr",
  ];

  function ProfileRelationsBox(propriedades) {
    return (
      <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
          {propriedades.title} ({propriedades.items.length})
        </h2>
        <ul>
          {seguidores.map((itemAtual) => {
            return (
              <li key={itemAtual}>
                <a href={itemAtual.html_url}>
                  <img src={itemAtual.avatar_url} />
                  <span>{itemAtual.login}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </ProfileRelationsBoxWrapper>
    );
  }

  const [Stars, setStars] = React.useState([]);
  const [seguidores, setSeguidores] = React.useState([]);

  React.useEffect(function () {
    fetch("https://api.github.com/repos/Elmo-Jr/alurakut")
      .then((resposta) => {
        return resposta.json();
      })
      .then(function (respostaRepo) {
        setStars(respostaRepo.stargazers_count);
      });

    fetch("https://api.github.com/users/elmo-jr/followers")
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json();
      })
      .then(function (respostaCompleta) {
        setSeguidores(respostaCompleta);
      });

    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        Authorization: "0ba4c224d0e36f8b4a797123ab1a8e",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query{
                  allRecados{
                    id
                    creatorslug
                    text
                  }
                }`,
      }),
    })
      .then((response) => response.json())
      .then((respostaCompleta) => {
        const recadosVindosDoDato = respostaCompleta.data.allRecados;
        setRecados(recadosVindosDoDato);
      });

    const urlSeguidoires = `https://api.github.com/users/${usuarioAleatorio}/followers`;
    fetch(urlSeguidoires)
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json();
      })
      .then(function (respostaCompleta) {
        setSeguidores(respostaCompleta);
      });

    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        Authorization: "0ba4c224d0e36f8b4a797123ab1a8e",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query {
        allCommunities {
          id 
          title
          imageUrl
          creatorSlug
        }
      }`,
      }),
    })
      .then((response) => response.json())
      .then((respostaCompleta) => {
        const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
        setComunidades(comunidadesVindasDoDato);
      });
  }, []);

  return (
    <>
      <AlurakutMenu githubUser={usuarioAleatorio} />
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> */}
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vinde!! {usuarioAleatorio}</h1>

            <OrkutNostalgicIconSet
              sexy={3}
              confiavel={3}
              legal={2}
              fas={Stars}
            />
          </Box>

          <Box>
            <h2 className="subTitle">Criar comunidade</h2>
            <form
              onSubmit={function handleCriaComunidade(e) {
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);

                // console.log("Campo: ", dadosDoForm.get("title"));
                // console.log("Campo: ", dadosDoForm.get("image"));

                const comunidade = {
                  title: dadosDoForm.get("title"),
                  imageUrl: dadosDoForm.get("image"),
                  creatorSlug: usuarioAleatorio,
                };

                fetch("/api/comunidades/", {
                  method: "Post",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(comunidade),
                }).then(async (response) => {
                  const dados = await response.json();
                  console.log(dados.registroCriado);
                  const comunidade = dados.registroCriado;
                  const comunidadesAtualizadas = [...comunidades, comunidade];
                  setComunidades(comunidadesAtualizadas);
                });
              }}
            >
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>Criar comunidade</button>
            </form>
          </Box>
          <Box>
            <h2 className="subTitle">Deixe um recado</h2>
            <form
              onSubmit={function handleCriaComunidade(e) {
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);

                const recado = {
                  text: dadosDoForm.get("text"),
                  creatorslug: usuarioAleatorio,
                };

                fetch("/api/recados/", {
                  method: "Post",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(recado),
                }).then(async (response) => {
                  const dados = await response.json();
                  console.log(dados.registroCriado);
                  const recado = dados.registroCriado;
                  const recadosAtualizados = [...recados, recado];
                  setRecados(recadosAtualizados);
                });
              }}
            >
              <div>
                <textarea
                  placeholder="Escreva seu recado :)"
                  name="text"
                  aria-label="Escreva seu recado"
                  type="text"
                />
              </div>

              <button>Enviar</button>
            </form>
          </Box>
          <RecadosBoxWrapper>
            <h2 className="smallTitle">Recados ({recados.length})</h2>
            <ul>
              {recados.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/recados/${itemAtual.id}`}>
                      <img
                        src={`https://github.com/${itemAtual.creatorslug}.png`}
                      />
                      <h3>{itemAtual.creatorslug}</h3>
                      <p>{itemAtual.text}</p>
                      <p className="clear" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </RecadosBoxWrapper>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBox title="Seguidores" items={seguidores} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/comunidades/${itemAtual.id}`}>
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`https://github.com/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch(
    "https://alurakut.vercel.app/api/auth",
    {
      headers: {
        Authorization: token,
      },
    }
  ).then((resposta) => resposta.json());

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser,
    },
  };
}
