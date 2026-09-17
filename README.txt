WS · sito
=========

File
----
index.html    home
contact.html  contatti, modulo semplice su FormSubmit
privacy.html  informativa privacy
cookies.html  cookie policy
style.css     foglio di stile condiviso, copia di riferimento
script.js     script condiviso, copia di riferimento
images/       immagini del sito

Stile e script
--------------
Ogni pagina ha stile e script gia incorporati, quindi funziona anche aperta da
sola con doppio clic. I file style.css e script.js sono la copia di riferimento.
Le pagine non li richiamano, per evitare doppia esecuzione dello script. Se
modifichi qualcosa, aggiorna sia il file esterno sia il blocco dentro le pagine.

Modulo contatti
---------------
Usa FormSubmit. L'indirizzo non e nel codice, viene composto dallo script a
runtime contro gli spambot. Alla prima invio dal sito pubblicato ricevi da
FormSubmit una email di conferma con un link da cliccare: fino ad allora i
messaggi non arrivano.

Pubblicazione
-------------
Carica il contenuto della cartella nella root del dominio. Nessuna compilazione.

Aggiornamento settembre 2026
----------------------------
Email generale: business@wsdream.it (composta dallo script, come prima).
FormSubmit va confermato per questo indirizzo: al primo invio arriva la
email di attivazione su business@wsdream.it.
Il modulo invia Interest (categorie scelte), Message, Name, Email.
I link contact.html?topic=self-tanning, sun-care, spray-foundation
preselezionano la categoria.
Carosello marchi: evita due marchi uguali vicini e controlla che il primo
e l'ultimo siano diversi, perche la sequenza si ripete.
Per cambiare un'immagine: metti il file in images/ e aggiorna src dentro
il tag img corrispondente in index.html.
