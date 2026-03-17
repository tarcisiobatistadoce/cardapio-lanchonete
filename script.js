// ========== DADOS DO CARDÁPIO ==========
        const cardapio = [
            // Hambúrgueres
            {
                id: 1,
                nome: "X-Burguer",
                descricao: "Pão, hambúrguer 150g, queijo, alface e tomate",
                preco: 15.00,
                imagem: "https://placehold.co/400x300/ff6b35/white?text=X-Burguer",
                categoria: "hamburguer"
            },
            {
                id: 2,
                nome: "X-Salada",
                descricao: "Pão, hambúrguer, queijo, alface, tomate e maionese",
                preco: 17.00,
                imagem: "https://placehold.co/400x300/ff6b35/white?text=X-Salada",
                categoria: "hamburguer"
            },
            {
                id: 3,
                nome: "X-Bacon",
                descricao: "Pão, hambúrguer, queijo, bacon crocante e salada",
                preco: 20.00,
                imagem: "https://placehold.co/400x300/ff6b35/white?text=X-Bacon",
                categoria: "hamburguer"
            },
            {
                id: 4,
                nome: "X-Tudo",
                descricao: "Pão, 2 hambúrgueres, queijo, bacon, ovo, salada e molho especial",
                preco: 25.00,
                imagem: "https://placehold.co/400x300/ff6b35/white?text=X-Tudo",
                categoria: "hamburguer"
            },
            
            // Bebidas
            {
                id: 5,
                nome: "Coca-Cola Lata",
                descricao: "350ml gelada",
                preco: 5.00,
                imagem: "https://placehold.co/400x300/0047ab/white?text=Coca-Cola",
                categoria: "bebida"
            },
            {
                id: 6,
                nome: "Guaraná Lata",
                descricao: "350ml gelada",
                preco: 5.00,
                imagem: "https://placehold.co/400x300/ff0000/white?text=Guaraná",
                categoria: "bebida"
            },
            {
                id: 7,
                nome: "Suco Natural",
                descricao: "500ml - Laranja ou Maracujá",
                preco: 8.00,
                imagem: "https://placehold.co/400x300/ffa500/white?text=Suco",
                categoria: "bebida"
            },
            {
                id: 8,
                nome: "Água Mineral",
                descricao: "500ml sem gás",
                preco: 3.00,
                imagem: "https://placehold.co/400x300/00aaff/white?text=Água",
                categoria: "bebida"
            },
            
            // Combos
            {
                id: 9,
                nome: "Combo Família",
                descricao: "2 X-Burguer + 2 Refris + Batata Grande",
                preco: 45.00,
                imagem: "https://placehold.co/400x300/ffaa00/white?text=Combo+Família",
                categoria: "combo"
            },
            {
                id: 10,
                nome: "Combo Individual",
                descricao: "X-Burguer + Batata Média + Refri Lata",
                preco: 22.00,
                imagem: "https://placehold.co/400x300/ffaa00/white?text=Combo+Individual",
                categoria: "combo"
            },
            
            // Sobremesas
            {
                id: 11,
                nome: "Petit Gateau",
                descricao: "Bolo de chocolate com calda e sorvete",
                preco: 18.00,
                imagem: "https://placehold.co/400x300/8b4513/white?text=Petit+Gateau",
                categoria: "sobremesa"
            },
            {
                id: 12,
                nome: "Sorvete",
                descricao: "2 bolas - Chocolate, Morango ou Baunilha",
                preco: 10.00,
                imagem: "https://placehold.co/400x300/ffb6c1/white?text=Sorvete",
                categoria: "sobremesa"
            },
            {
                id: 13,
                nome: "Pudim",
                descricao: "Fatia de pudim de leite condensado",
                preco: 8.00,
                imagem: "https://placehold.co/400x300/ffd700/white?text=Pudim",
                categoria: "sobremesa"
            }
        ];

        // ========== VARIÁVEIS GLOBAIS ==========
        let carrinho = [];
        let categoriaAtiva = "todos";
        let termoBusca = "";

        // ========== CARREGAR PRODUTOS NA TELA ==========
        function carregarProdutos() {
            const container = document.getElementById('produtos-container');
            container.innerHTML = '';
            
            let produtosFiltrados = cardapio;
            
            // Filtrar por categoria
            if (categoriaAtiva !== "todos") {
                produtosFiltrados = produtosFiltrados.filter(p => p.categoria === categoriaAtiva);
            }
            
            // Filtrar por busca
            if (termoBusca.trim() !== "") {
                const busca = termoBusca.toLowerCase();
                produtosFiltrados = produtosFiltrados.filter(p => 
                    p.nome.toLowerCase().includes(busca) || 
                    p.descricao.toLowerCase().includes(busca)
                );
            }
            
            if (produtosFiltrados.length === 0) {
                container.innerHTML = '<div class="sem-produtos">😕 Nenhum produto encontrado</div>';
                return;
            }
            
            produtosFiltrados.forEach(produto => {
                const card = document.createElement('div');
                card.className = 'produto-card';
                card.innerHTML = `
                    <img src="${produto.imagem}" alt="${produto.nome}" class="produto-img">
                    <div class="produto-info">
                        <div class="produto-nome">${produto.nome}</div>
                        <div class="produto-descricao">${produto.descricao}</div>
                        <div class="produto-preco">R$ ${produto.preco.toFixed(2)}</div>
                        <button class="btn-adicionar" onclick="adicionarAoCarrinho(${produto.id})">
                            + Adicionar
                        </button>
                    </div>
                `;
                container.appendChild(card);
            });
        }

        // ========== FILTROS ==========
        function filtrarPorCategoria(categoria) {
            categoriaAtiva = categoria;
            
            // Ativar botão da categoria
            document.querySelectorAll('.categoria-btn').forEach(btn => {
                if (btn.dataset.categoria === categoria) {
                    btn.classList.add('ativo');
                } else {
                    btn.classList.remove('ativo');
                }
            });
            
            carregarProdutos();
        }

        // ========== CARRINHO ==========
        function adicionarAoCarrinho(produtoId) {
            const produto = cardapio.find(p => p.id === produtoId);
            const itemExistente = carrinho.find(item => item.id === produtoId);
            
            if (itemExistente) {
                itemExistente.quantidade += 1;
            } else {
                carrinho.push({
                    ...produto,
                    quantidade: 1
                });
            }
            
            atualizarCarrinho();
        }

        function removerDoCarrinho(produtoId) {
            carrinho = carrinho.filter(item => item.id !== produtoId);
            atualizarCarrinho();
        }

        function alterarQuantidade(produtoId, delta) {
            const item = carrinho.find(item => item.id === produtoId);
            if (item) {
                item.quantidade += delta;
                if (item.quantidade <= 0) {
                    removerDoCarrinho(produtoId);
                } else {
                    atualizarCarrinho();
                }
            }
        }

        function atualizarCarrinho() {
            // Atualizar contador
            const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
            document.getElementById('cart-count').textContent = totalItens;
            
            // Atualizar lista de itens
            const carrinhoItens = document.getElementById('carrinho-itens');
            if (carrinho.length === 0) {
                carrinhoItens.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Seu carrinho está vazio</p>';
            } else {
                carrinhoItens.innerHTML = carrinho.map(item => `
                    <div class="carrinho-item">
                        <div class="carrinho-item-info">
                            <div class="carrinho-item-nome">${item.nome}</div>
                            <div class="carrinho-item-preco">R$ ${item.preco.toFixed(2)}</div>
                        </div>
                        <div class="carrinho-item-acoes">
                            <button class="btn-diminuir" onclick="alterarQuantidade(${item.id}, -1)">-</button>
                            <span class="carrinho-item-qtd">${item.quantidade}</span>
                            <button class="btn-aumentar" onclick="alterarQuantidade(${item.id}, 1)">+</button>
                            <button class="btn-remover" onclick="removerDoCarrinho(${item.id})">🗑️</button>
                        </div>
                    </div>
                `).join('');
            }
            
            // Atualizar total
            const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
            document.getElementById('total-valor').textContent = `R$ ${total.toFixed(2)}`;
            
            // Habilitar/desabilitar botão de finalizar
            document.getElementById('finalizar-pedido').disabled = carrinho.length === 0;
        }

        // ========== FINALIZAR PEDIDO ==========
        function finalizarPedido() {
            if (carrinho.length === 0) return;
            
            // Montar mensagem
            let mensagem = "Olá, gostaria de pedir:%0A%0A";
            
            carrinho.forEach(item => {
                mensagem += `🍔 ${item.nome} (${item.quantidade}x) - R$ ${(item.preco * item.quantidade).toFixed(2)}%0A`;
            });
            
            const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
            mensagem += `%0A*Total: R$ ${total.toFixed(2)}*`;
            
            // Número da lanchonete (substitua pelo número real)
            const numeroWhatsApp = "5511999999999"; // Exemplo: 11 99999-9999
            
            // Abrir WhatsApp
            window.open(`https://wa.me/${numeroWhatsApp}?text=${mensagem}`, '_blank');
        }

        // ========== TOGGLE CARRINHO NO MOBILE ==========
        function toggleCarrinho() {
            const carrinho = document.getElementById('carrinho');
            if (window.innerWidth <= 768) {
                if (carrinho.style.transform === 'translateY(0%)') {
                    carrinho.style.transform = 'translateY(100%)';
                } else {
                    carrinho.style.transform = 'translateY(0%)';
                    carrinho.style.display = 'block';
                }
            }
        }

        // ========== EVENT LISTENERS ==========
        document.addEventListener('DOMContentLoaded', () => {
            // Carregar produtos
            carregarProdutos();
            
            // Eventos das categorias
            document.querySelectorAll('.categoria-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    filtrarPorCategoria(e.target.dataset.categoria);
                });
            });
            
            // Evento de busca
            document.getElementById('search-input').addEventListener('input', (e) => {
                termoBusca = e.target.value;
                carregarProdutos();
            });
            
            // Inicializar carrinho
            atualizarCarrinho();
            
            // Esconder carrinho no mobile inicialmente
            if (window.innerWidth <= 768) {
                document.getElementById('carrinho').style.transform = 'translateY(100%)';
            }
        });

        // Ajustar carrinho ao redimensionar a tela
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                document.getElementById('carrinho').style.transform = 'translateY(0)';
            } else {
                document.getElementById('carrinho').style.transform = 'translateY(100%)';
            }
        });