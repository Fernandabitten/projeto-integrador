# ================================================================
# Gera relatório de commits
# Como executar para gerar o relatório:
#
# 1) Abra o terminal na raiz do projeto.
# 2) Execute:
#
#      ./generate-report.sh
#
# (No Windows, use o Git Bash ou WSL para rodar arquivos .sh)
#
# O arquivo final será gerado em:
#      docs/relatorio-commits.md
# ================================================================

OUTPUT="docs/relatorio-commits.md"

echo "#  Relatório de Commits" > $OUTPUT
echo "Última atualização: $(date +"%d/%m/%Y %H:%M")" >> $OUTPUT
echo "" >> $OUTPUT
echo "" >> $OUTPUT

# Lista autores
git shortlog -s -n -e | while read count name email; do
    author="$name $email"

    echo "##  $author ($count commits)" >> $OUTPUT

    echo "### Commits normais:" >> $OUTPUT
    git log --pretty=format:"- %s" --author="$email" --grep="Merge pull request" --invert-grep >> $OUTPUT

    echo "" >> $OUTPUT
    echo "### Merge Pull Requests:" >> $OUTPUT
    git log --pretty=format:"- %s" --author="$email" --grep="Merge pull request" >> $OUTPUT

    echo "" >> $OUTPUT
    echo "" >> $OUTPUT
done
