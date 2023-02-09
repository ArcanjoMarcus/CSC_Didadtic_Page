# CSC Didático

PDF's tem uma grande problática de que residem em uma espécie de posição na qual não são nem livros propriamente ditos, nem um formato propriamente feito para serem vistos na web. Essa página vem com a proposta de poder interseccionar entre as vantages de um conteúdo fixo com as pontencialidades das utilidades da internet.

### Estrutura de notação dos artigos/capitulos base



### Padrões RegExp para formatação do texto

Padrão para detecção de Titulo de Seção:
#( )?*(A-Za-z)+ *\n

Padrão para detecção de Titulo de subSeção:
##( )?*(A-Za-z)+ *\n

Padrão para detecção de Titulo de subSeção:
###( )?*(A-Za-z)+ *\n

Padrão detecção de referência:
( )*ref\([A-Za-z 1-9]+\)( )+

Padrão detecção de elemento de glossário:
( )*gloss\([A-Za-z 1-9]+\)( )+

