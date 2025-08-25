type FetchOptions = {
  headers: {
    [key: string]: string;
  };
  body: any; // This is the type of the body
  wantJson?: boolean;
};

export const fetchClient = async (
  url: string,
  method: string,
  options?: FetchOptions
) => {
  try {
    const { wantJson = true, headers, body } = options ?? {};
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
      // Error is the error message from the server
      return { res, error: await res.json() }; // error.error ?? error.message
    }
    // Response is the response from the server
    return { res, data: wantJson ? await res.json() : null };
  } catch (error) {
    // Error is the error message from the client
    return { res: null, data: null, error }; // error.error ?? error.message
  }
};

export const fetchClientServerAction = async (action: Function) => {
  try {
    const { data, error } = await action();
    // Response is the response from the server
    return { data, error };
  } catch (error) {
    // Error is the error message from the client
    return { error }; // error.error ?? error.message
  }
};
