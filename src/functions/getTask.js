import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { dynamo, TABLE } from "../data/dynamo.js";

export const handler = async (event) => {
  try {
    const { id } = event.pathParameters;

    const result = await dynamo.send(
      new GetCommand({
        TableName: TABLE,
        Key: { id }
      })
    );

    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          success: false,
          message: "Tarefa não encontrada"
        })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        data: result.Item
      })
    };
  } catch (err) {
    console.error("Erro ao buscar tarefa:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "Erro interno ao buscar tarefa"
      })
    };
  }
};
