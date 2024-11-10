import { OptionsProvider } from "./options.provider";
import { createConnection, Connection } from 'mysql';

export const connectionProvider = {
    provide: 'CONNECTION',
    useFactory: (optionProvider: OptionsProvider, optionalProvider?: string) => {
        const options = optionProvider.get();
        return createConnection(options);
    },
    inject: [OptionsProvider, { token: 'SomeOptionalProvider', optional: true }]
};