import { SiteClient } from "datocms-client";

export default async function recebedorDeRequests(request, response) {
    if (request.method === "POST") {
        const TOKEN = "d29e4bbc3ad31bbc6aef2a334708de";
        const client = new SiteClient(TOKEN);

        // Validar os dados, antes de sair cadastrando
        const registroCriado = await client.items.create({
        itemType: "968027",
        ...request.body,
        // title: "Comunidade de Teste",
        // imageUrl: "https://github.com/omariosouto.png",
        // creatorSlug: "omariosouto"
        });

        console.log(registroCriado);

        response.json({
        dados: "Algum dado qualquer",
        registroCriado: registroCriado,
        });
    }
}
