import { Client } from "@gradio/client";

const client = await Client.connect("hemantha-14/seniment_analysis");
const result = await client.predict("/predict", { 		
		text: "Hello!!", 
});

console.log(result.data);
