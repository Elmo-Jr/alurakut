import { SiteClient } from "datocms-client";

export default async function recebedorDeRequests(request, response) {
  if (request.method === "POST") {
    const TOKEN = "d29e4bbc3ad31bbc6aef2a334708de";
    const client = new SiteClient(TOKEN);

    const registroCriado = await client.items.create({
      itemType: "977381",
      ...request.body,
    });

    console.log(registroCriado);

    response.json({
      dados: "Algum dado qualquer",
      registroCriado: registroCriado,
    });
  }
}
