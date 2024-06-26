import R2Error from "../../model/errors/R2Error";
import LoggerProvider, { LogSeverity } from '../../providers/ror2/logging/LoggerProvider';

interface State {
    error: R2Error | null;
}

interface ErrorWithLogging {
    error: R2Error;
    severity: LogSeverity;
    logMessage?: string;
}

export default {
    namespaced: true,

    state: (): State => ({
        error: null,
    }),

    mutations: {
        discardError: function(state: State): void {
            state.error = null;
        },

        handleError: function(
            state: State,
            error: R2Error | ErrorWithLogging
        ): void {
            state.error = error instanceof R2Error ? error : error.error;

            if (error instanceof R2Error) {
                LoggerProvider.instance.Log(LogSeverity.ERROR, `[${error.name}]: ${error.message}`);
            } else {
                const msg = error.logMessage || `[${error.error.name}]: ${error.error.message}`;
                LoggerProvider.instance.Log(error.severity, msg);
            }
        },
    }
}
