import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from "../src/lib/AlurakutCommons";
import {ProfileRelationsBoxWrapper} from "../src/components/ProfileRelations";
import {useState} from "react";

function ProfileSidebar(props) {
    return (
        <Box>
            <img src={`https://github.com/${props.githubUser}.png`} alt="Foto de perfil" style={{borderRadius: "8px"}}/>

            <hr/>

            <p>
                <a className="boxlink" href={`https://github.com/${props.githubUser}`}>
                    @{props.githubUser}
                </a>
            </p>

            <hr/>

            <AlurakutProfileSidebarMenuDefault/>
        </Box>
    );
}

export default function Home() {
    const githubUser = "ImGabreuw";
    const favoriteUsers = [
        "juunegreiros",
        "omariosouto",
        "peas",
        "rafaballerini",
        "marcobrunodev",
        "felipefialho"
    ]
    const [communities, setCommunities] = useState([{
        id: "1312464986415641568478",
        title: "Eu odeio acordar cedo",
        image: "https://alurakut.vercel.app/capa-comunidade-01.jpg"
    }]);

    return (
        <>
            <AlurakutMenu/>
            <MainGrid>
                <div className="profileArea" style={{gridArea: "profileArea"}}>
                    <ProfileSidebar githubUser={githubUser}/>
                </div>
                <div className="welcomeArea" style={{gridArea: "welcomeArea"}}>
                    <Box>
                        <h1 className="title">
                            Bem vindo(a)
                        </h1>

                        <OrkutNostalgicIconSet/>
                    </Box>

                    <Box>
                        <h2 className="subtitle">O que você deseja fazer?</h2>
                        <form onSubmit={function handleCreateCommunity(event) {
                            event.preventDefault();

                            const formData = new FormData(event.target);

                            const community = {
                                id: new Date().toISOString(),
                                title: formData.get("title"),
                                image: formData.get("image"),
                            }

                            const updatedCommunities = [...communities, community];
                            setCommunities(updatedCommunities);
                        }}>
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

                            <button>
                                Criar comunidade
                            </button>
                        </form>
                    </Box>
                </div>
                <div className="profileRelationsArea" style={{gridArea: "profileRelationsArea"}}>
                    <ProfileRelationsBoxWrapper>
                        <h2 className="smallTitle">
                            Comunidades ({communities.length})
                        </h2>

                        <ul>
                            {communities.map(community => {
                                return (
                                    <li key={community.id}>
                                        <a href={`/users/${community.title}`} key={community.title}>
                                            <img src={community.image} alt="Foto da comunidade"/>
                                            <span>{community.title}</span>
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </ProfileRelationsBoxWrapper>

                    <ProfileRelationsBoxWrapper>
                        <h2 className="smallTitle">
                            Pessoas da comunidade ({favoriteUsers.length})
                        </h2>

                        <ul>
                            {favoriteUsers.map(user => {
                                return (
                                    <li key={user}>
                                        <a href={`/users/${user}`} key={user}>
                                            <img src={`https://github.com/${user}.png`} alt="Foto de perfil"/>
                                            <span>{user}</span>
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </ProfileRelationsBoxWrapper>
                </div>
            </MainGrid>
        </>
    );
}
