# What is it?

This is a decorator that can be used to measure the performance of a function.  
It can be used both with `sync` and `async` functions.

# How does it work?

The decorator will measure the time it takes for a function to execute and log it to the console / the given logger.  
It expects an object with the following properties:

- `name`: The name of the function to be measured
- `log`: The function to call with the measuration results
- `validation`: A function or a boolean that will be called / verified before the function to be measured is called. If it returns `false`, the function will be called but the measuration will not be logged.
  - If it is a function, it will be called with the arguments passed to the function to be measured.
  - If it is a boolean, it will be used as the validation result.

# Other Info

# ToDo
- [ ] Refactor + check vari
- [ ] A differenza del cache candidate, qui non può essere fatto uno sha della chiave in quanto la chiave stessa è il fulcro dell'analisi sulle performance. Capire come fare o semplicemente avvisare l'utente nel README.
- [x] Modelli.
- [x] Defaults.
- [x] Test.
- [x] Documentazione.
