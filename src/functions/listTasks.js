import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { dynamo, TABLE } from "../data/dynamo.js";

export const handler = async () => {
  try {
    const result = await dynamo.send(new ScanCommand({
      TableName: TABLE
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        data: result.Items || []
      })
    };
  } catch (err) {
    console.error("Erro ao listar tarefas:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "Erro interno ao listar tarefas"
      })
    };
  }
};