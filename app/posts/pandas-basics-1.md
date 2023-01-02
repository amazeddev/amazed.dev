---
title: Podstawy pakietu Pandas - część 1
excerpt: Pakiet Pandas to kolejna biblioteka, którą trzeba omówić w kontekście wprowadzenia do narzędzi związanych z podstawami Data Science w Python. Pandas świetnie nadaje się do pracy z danymi tabelarycznymi, które w przeciwieństwie do NumPy mogą posiadać kolumny różnych typów. Pozwala, między innymi, na czyszczenie, przetwarzanie czy grupowanie danych w jedno lub dwuwymiarowych tabelach.
date: April 12, 2020
tags: [python, datascience]
cover_img: pandas1.jpg
published: true
---

## Czym jest Pandas?

_Pandas_ jest w tym momencie podstawowym pakietem służącym do przetwarzania i analizy danych w języku Python. Oparty na _NumPy_, poznanym we wcześniejszych wpisach, dziedziczy po nim wiele funkcjonalności i zasad działania. Wiele metod i podejść, jak optymalizacja operacji element po elemencie na całych tablicach, sposoby indeksowania czy też wykorzystanie uniwersalnych funkcji (_unfunc_), działają zazwyczaj tak samo, lub są tylko rozwinięciem tego, co znamy z _NumPY_.

_Pandas_ świetnie nadaje się do pracy ze wszelkiego rodzaju samymi tabelarycznymi. Nie jesteśmy tu ograniczeni wymogiem znanym z _NumPy_, aby wszystkie dane były tego samego typu. W tym pakiecie wystarczy, aby wszystkie dane w jednej kolumnie posiadały ten sam tym. Dzięki temu usprawnieniu _Pandas_ z powodzeniem pozwala zapisać dane o strukturze tablic _SQL_, arkuszy _Excel'a_, ciągów czasowych czy ogólnie wszelkiego rodzaju danych pomiarowych, czy statystycznych.

## Struktury danych dostępne w Pandas

Podstawowymi dwoma strukturami zapisu danych w _Pandas_ są **Series** dla danych jednowymiarowych oraz **DataFrame** dla dwuwymiarowych. Aby zacząć opis struktur danych, musimy w pierwszej kolejności zaimportować biblioteki. Poza _pandas_ zaimportujmy również _numpy_, gdyż w bardzo wielu przykładach będziemy korzystać również z tej biblioteki, zwłaszcza do budowy _Series_ i _DataFrames_ na podstawie _ndarrays_.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[1]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="kn">import</span> <span class="nn">pandas</span> <span class="k">as</span> <span class="nn">pd</span>
<span class="kn">import</span> <span class="nn">numpy</span> <span class="k">as</span> <span class="nn">np</span></pre></div>
        </div>
      </div>
    </div>
  </div>
</div>

Gdy w naszym _jupyter notebook'u_ mamy poprawne importy, możemy przejść do pierwszej, prostszej w opisie struktury, a mianowicie _Series_.

### Series

Seria w _Pandas_ jest najprostszym obiektem przechowującym dane. Jest strukturą jednowymiarową, posiadającą etykiety każdego elementu. Etykiety (_labels_) możemy w uproszczeniu rozumieć jak indeksy jednowymiarowej tabeli czy tablicy _ndarray_, z tą jednak różnicą, że możemy nadać serii dowolne etykiety.

Najprostszym sposobem stworzenia serii w _pandas_ jest przekazanie do konstruktora iterowalnego obiektu, takiego jak lista, tupla czy _ndarray_.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[2]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">pd</span><span class="o">.</span><span class="n">Series</span><span class="p">([</span><span class="mi">1</span><span class="p">,</span> <span class="mf">3.2</span><span class="p">,</span> <span class="mf">0.1</span><span class="p">,</span> <span class="mf">2.</span><span class="p">])</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[2]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>0    1.0
1    3.2
2    0.1
3    2.0
dtype: float64</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[3]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">s</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">Series</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">randn</span><span class="p">(</span><span class="mi">4</span><span class="p">),</span> <span class="n">index</span><span class="o">=</span><span class="p">[</span><span class="s1">&#39;a&#39;</span><span class="p">,</span> <span class="s1">&#39;b&#39;</span><span class="p">,</span> <span class="s1">&#39;c&#39;</span><span class="p">,</span> <span class="s1">&#39;d&#39;</span><span class="p">])</span>
<span class="n">s</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[3]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>a    1.356471
b    0.042698
c    0.015426
d   -0.913081
dtype: float64</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

W wypadku, gdy nie sprecyzujemy jakie etykiety mają być, staną się nimi kolejne liczny całkowite numerowane od zera. Gdy jednak chcemy określić dokładnie, jakie chcemy etykiety nadać naszej serii. Zrobimy to, definiując je w wywołaniu `pd.Series()` parametrem _index_. Możemy do niego przekazać dowolnym obiekt _listopodobny_ z tym tylko zastrzeżeniem, że musi być tej samej długości co dane. Każda seria posiada również atrybut _index_, przy pomocy którego możemy pobrać jej etykiety.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[4]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">s</span><span class="o">.</span><span class="n">index</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[4]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>Index([&#39;a&#39;, &#39;b&#39;, &#39;c&#39;, &#39;d&#39;], dtype=&#39;object&#39;)</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Kolejnym powszechnym sposobem tworzenia serii w _Pandas_ jest przekazanie słownika. W takim wypadku nie jest konieczne precyzowanie etykiet, gdyż zostaną za nie przypisane klucze słownika. Gdy jednak przekażemy etykiety w parametrze _index_, nadpiszą one te wygenerowane na podstawie kluczy.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[5]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">pd</span><span class="o">.</span><span class="n">Series</span><span class="p">({</span><span class="s1">&#39;f&#39;</span><span class="p">:</span><span class="mi">1</span><span class="p">,</span> <span class="s1">&#39;g&#39;</span><span class="p">:</span><span class="mi">5</span><span class="p">,</span> <span class="s1">&#39;h&#39;</span><span class="p">:</span><span class="mi">3</span><span class="p">})</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[5]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>f    1
g    5
h    3
dtype: int64</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Jesteśmy również w stanie utworzyć serię na podstawie wartości skalarnej. W tym jednak wypadku musimy zdefiniować listę z etykietami, gdyż na tej podstawie _Pandas_ będzie wiedzieć, ile elementów z tą samą wartością skalarną ma się znaleźć w serii.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[6]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">pd</span><span class="o">.</span><span class="n">Series</span><span class="p">(</span><span class="mf">1.</span><span class="p">,</span> <span class="n">index</span><span class="o">=</span><span class="p">[</span><span class="s1">&#39;a&#39;</span><span class="p">,</span> <span class="s1">&#39;b&#39;</span><span class="p">,</span> <span class="s1">&#39;c&#39;</span><span class="p">])</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[6]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>a    1.0
b    1.0
c    1.0
dtype: float64</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

O seriach pakietu _Pandas_ możemy z powodzeniem myśleć jak o _Pythonowych_ listach. Zadziała indeksowanie czy tworzenie elementów na podstawie numeru kolejnego elementu, nawet jeśli etykiety nie są kolejnymi liczbami całkowitymi. _Pandas_ zrozumie nas, kiedy będziemy, dla przykładu, chcieli pobrać pierwszy, bądź dwa ostatnie elementy korzystając z zapisu znanego z indeksowania _pythonowych_ list czy _ndarrays_.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[7]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">s</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[7]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>1.356471223935805</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[8]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">s</span><span class="p">[</span><span class="mi">2</span><span class="p">:]</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[8]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>c    0.015426
d   -0.913081
dtype: float64</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Jeśli chcemy, możemy również przekształcić serię właśnie w _ndarray_ za pomocą metody `pd.Series.to_numpy()`. Spowoduje to utratę etykiet, zapisany zostanie tylko ciąg wartości.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[9]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">s</span><span class="o">.</span><span class="n">to_numpy</span><span class="p">()</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[9]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([ 1.35647122,  0.04269826,  0.01542582, -0.91308132])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

O `pd.Series` możemy również myśleć jak o swego rodzaju słowniku. Tak jak wartość słownika możemy uzyskać, korzystając z zapisu _dictionary['key']_, tak w serii przekazując do tego samego zapisu nazwę etykiety, otrzymamy odpowiadającą jej wartość. Również przypisanie wartości do etykiety nieistniejącej w serii spowoduje dodanie tej wartości wraz z etykietą.

Do tego, tak samo, jak w przypadku słowników możemy sprawdzić, czy dana etykieta znajduje się w serii za pomocą operatora **is**.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[10]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">s</span><span class="p">[</span><span class="s1">&#39;a&#39;</span><span class="p">]</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[10]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>1.356471223935805</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[11]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">s</span><span class="p">[</span><span class="s1">&#39;e&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="mi">10</span>
<span class="n">s</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[11]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>a     1.356471
b     0.042698
c     0.015426
d    -0.913081
e    10.000000
dtype: float64</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[12]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="s1">&#39;e&#39;</span> <span class="ow">in</span> <span class="n">s</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[12]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>True</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[13]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="s1">&#39;f&#39;</span> <span class="ow">in</span> <span class="n">s</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[13]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>False</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

O seriach możemy również myśleć jak o _ndarrays_. Wszystkie metody pakietu _NumPy_ przyjmujące tablicę, zadziałają również dla serii _Pandas_. Na seriach można również wykonywać operacje arytmetycznie podobnie jak na tablicach. Wykonają się one analogicznie, element po elemencie, zwracając serię o tej samej długości.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[14]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">np</span><span class="o">.</span><span class="n">sin</span><span class="p">(</span><span class="n">s</span><span class="p">)</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[14]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>a    0.977120
b    0.042685
c    0.015425
d   -0.791391
e   -0.544021
dtype: float64</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[15]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">s</span><span class="o">*</span><span class="mi">10</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[15]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>a     13.564712
b      0.426983
c      0.154258
d     -9.130813
e    100.000000
dtype: float64</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

### DataFrame

Kolejną obiektem przechowującym dane w _Pandas_ jest **DataFrame**. Jest to zdecydowanie najczęściej wykorzystywana struktura w _Pandas_ i ogólnie w _data science_ opartym o _Python_. _DataFrames_ są to dwuwymiarowe tabelaryczne obiekty, składające się z kolumn, gdzie kolumny mogą się różnic między sobą typem danych.

Zazwyczaj zmienną przechowującą _DataFrame_ nazywamy w skrócie od pierwszych liter nazwy obiektu _df_.

Najbardziej bezpośrednim sposobem na utworzenie _DataFrame_ jest przekazanie do konstruktora słownika, którego wartościami są **Series**. W ten sposób każda seria stanie się kolumną tablicy, a klucze słownika staną się nazwami kolumn.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[16]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">d</span> <span class="o">=</span> <span class="p">{</span><span class="s1">&#39;fst&#39;</span><span class="p">:</span> <span class="n">pd</span><span class="o">.</span><span class="n">Series</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">rand</span><span class="p">(</span><span class="mi">3</span><span class="p">),</span> <span class="n">index</span><span class="o">=</span><span class="nb">list</span><span class="p">(</span><span class="s1">&#39;abc&#39;</span><span class="p">)),</span>
     <span class="s1">&#39;snd&#39;</span><span class="p">:</span> <span class="n">pd</span><span class="o">.</span><span class="n">Series</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">rand</span><span class="p">(</span><span class="mi">4</span><span class="p">),</span> <span class="n">index</span><span class="o">=</span><span class="nb">list</span><span class="p">(</span><span class="s1">&#39;abcd&#39;</span><span class="p">))}</span>
<span class="n">df</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">DataFrame</span><span class="p">(</span><span class="n">d</span><span class="p">)</span>
<span class="n">df</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[16]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>fst</th>
                    <th>snd</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>a</th>
                    <td>0.891356</td>
                    <td>0.662332</td>
                  </tr>
                  <tr>
                    <th>b</th>
                    <td>0.861472</td>
                    <td>0.204189</td>
                  </tr>
                  <tr>
                    <th>c</th>
                    <td>0.080433</td>
                    <td>0.562178</td>
                  </tr>
                  <tr>
                    <th>d</th>
                    <td>NaN</td>
                    <td>0.876908</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Jeśli obiekty, z których mają zostać zbudowane kolumny tabeli, w tym wypadku `pd.Series()`, są różnej długości, lub ich indeksy się różnią, kolumny będą zawierały wszystkie elementy, a w wypadku braku odpowiadającego indeksu w którejś z nich, zostanie wstawiona wartość _np.NaN_.

Każda z tablic posiada atrybuty _index_ (podobnie jak serie) oraz _columns_, za pomocą których możemy otrzymać nazwy kolumn i etykiet (wierszy) tabeli.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[17]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">columns</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[17]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>Index([&#39;fst&#39;, &#39;snd&#39;], dtype=&#39;object&#39;)</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[18]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">index</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[18]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>Index([&#39;a&#39;, &#39;b&#39;, &#39;c&#39;, &#39;d&#39;], dtype=&#39;object&#39;)</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Podobnie jak w przypadku `pd.Series()` jeśli nie przekażemy za pomocą atrybutu _index_ listy etykiet, za etykiety (indeksy) przypisany zostanie ciąg liczby całkowitych zaczynających się od zera. Gdy natomiast któraś wartość tablicy indeksów nie będzie miała odzwierciedlenia w kolumnie, nie zostanie ona pominięta, jedynie w tym miejscu zostaje wstawione _np.NaN_. Również, gdy indeks nie występuje w żadnej z kolumn.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[19]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">pd</span><span class="o">.</span><span class="n">DataFrame</span><span class="p">(</span><span class="n">d</span><span class="p">,</span> <span class="n">index</span><span class="o">=</span><span class="nb">list</span><span class="p">(</span><span class="s1">&#39;bcde&#39;</span><span class="p">))</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[19]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>fst</th>
                    <th>snd</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>b</th>
                    <td>0.861472</td>
                    <td>0.204189</td>
                  </tr>
                  <tr>
                    <th>c</th>
                    <td>0.080433</td>
                    <td>0.562178</td>
                  </tr>
                  <tr>
                    <th>d</th>
                    <td>NaN</td>
                    <td>0.876908</td>
                  </tr>
                  <tr>
                    <th>e</th>
                    <td>NaN</td>
                    <td>NaN</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

W wypadku budowy `pd.DataFrame()` na podstawie słownika _Pandas_ automatycznie przypisuje klucze słownika jako nazwy kolumn. Jeśli jednak chcemy zmienić ich kolejność albo wykorzystać tylko część z nich, możemy przekazać w parametrze _columns_ listę wybranych kluczy słownika, w wybranej przez nas kolejności.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[20]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">pd</span><span class="o">.</span><span class="n">DataFrame</span><span class="p">(</span><span class="n">d</span><span class="p">,</span> <span class="n">columns</span><span class="o">=</span><span class="p">[</span><span class="s1">&#39;snd&#39;</span><span class="p">,</span> <span class="s1">&#39;fst&#39;</span><span class="p">])</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[20]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>snd</th>
                    <th>fst</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>a</th>
                    <td>0.662332</td>
                    <td>0.891356</td>
                  </tr>
                  <tr>
                    <th>b</th>
                    <td>0.204189</td>
                    <td>0.861472</td>
                  </tr>
                  <tr>
                    <th>c</th>
                    <td>0.562178</td>
                    <td>0.080433</td>
                  </tr>
                  <tr>
                    <th>d</th>
                    <td>0.876908</td>
                    <td>NaN</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

_DataFrame_ nie potrzebuje słownika serii, w zupełności wystarczy, aby słownik jako wartości zawierał _pythonowe_ obiekty, po których można iterować, typu listy, tuple czy _ndarray_. W tym wypadku, gdy nie przekażemy listy z indeksami, zostaną przypisane kolejne liczby całkowite.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[21]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">d</span> <span class="o">=</span> <span class="p">{</span><span class="s1">&#39;one&#39;</span><span class="p">:</span> <span class="p">[</span><span class="mi">1</span><span class="p">,</span> <span class="mi">2</span><span class="p">,</span> <span class="mi">3</span><span class="p">,</span> <span class="mi">4</span><span class="p">],</span> <span class="s1">&#39;two&#39;</span><span class="p">:</span> <span class="p">[</span><span class="mi">11</span><span class="p">,</span> <span class="mi">12</span><span class="p">,</span> <span class="mi">13</span><span class="p">,</span> <span class="mi">14</span><span class="p">]}</span>
<span class="n">pd</span><span class="o">.</span><span class="n">DataFrame</span><span class="p">(</span><span class="n">d</span><span class="p">)</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[21]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>one</th>
                    <th>two</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>0</th>
                    <td>1</td>
                    <td>11</td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>2</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>3</td>
                    <td>13</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>4</td>
                    <td>14</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[22]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">pd</span><span class="o">.</span><span class="n">DataFrame</span><span class="p">(</span><span class="n">d</span><span class="p">,</span> <span class="n">index</span><span class="o">=</span><span class="nb">list</span><span class="p">(</span><span class="s1">&#39;abcd&#39;</span><span class="p">))</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[22]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>one</th>
                    <th>two</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>a</th>
                    <td>1</td>
                    <td>11</td>
                  </tr>
                  <tr>
                    <th>b</th>
                    <td>2</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <th>c</th>
                    <td>3</td>
                    <td>13</td>
                  </tr>
                  <tr>
                    <th>d</th>
                    <td>4</td>
                    <td>14</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

> Jeśli w momencie tworzenia `pd.DataFrame()` nie zdefiniowaliśmy indeksów, wartości im można również przypisać korzystając z atrybutu `pd.DataFrame.index`, przypisując do niego listę z indeksami.
>
> `df.index = list('abcd')`
>
> Oczywiście również w tym przypadku długość listy indeksów musi być zgodna z długością kolumny tablicy.

Wygodnym sposobem tworzenia tablic _DataFrame_ jest też przekazanie listy słowników. W takim wypadku każdy słownik odpowiada jednemu wierszowi tablicy, a każdy klucz w słowniku nazwie kolumny, do której zostanie przypisana jego odpowiadająca wartość.

W przypadku, gdy w którymś słowniku brakuje jakiegoś klucza występującego w innych słownikach, do tego pola zostanie przypisane _np.NaN_.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[23]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">l</span> <span class="o">=</span> <span class="p">[{</span><span class="s1">&#39;a&#39;</span><span class="p">:</span> <span class="mi">1</span><span class="p">,</span> <span class="s1">&#39;b&#39;</span><span class="p">:</span> <span class="mi">2</span><span class="p">,</span> <span class="s1">&#39;c&#39;</span><span class="p">:</span> <span class="mi">3</span><span class="p">},</span> <span class="p">{</span><span class="s1">&#39;a&#39;</span><span class="p">:</span> <span class="mi">11</span><span class="p">,</span> <span class="s1">&#39;b&#39;</span><span class="p">:</span> <span class="mi">12</span><span class="p">}]</span>
<span class="n">pd</span><span class="o">.</span><span class="n">DataFrame</span><span class="p">(</span><span class="n">l</span><span class="p">)</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[23]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>a</th>
                    <th>b</th>
                    <th>c</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>0</th>
                    <td>1</td>
                    <td>2</td>
                    <td>3.0</td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>11</td>
                    <td>12</td>
                    <td>NaN</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Ostatnim z najbardziej popularnych sposobów _'ręcznego'_ tworzenia tabel _DataFrame_ jest przekazanie dwuwymiarowej tablicy _ndarray_. Pamiętać jednak należy, że bez dodatkowego przekazania parametrów _index_ i _columns_, tabela taka zarówno w miejscu indeksów, jak i nazw kolumn będzie posiadała kolejne liczby całkowite liczone od zera.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[24]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">arr</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">rand</span><span class="p">(</span><span class="mi">4</span><span class="p">,</span><span class="mi">4</span><span class="p">)</span>
<span class="n">pd</span><span class="o">.</span><span class="n">DataFrame</span><span class="p">(</span><span class="n">arr</span><span class="p">)</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[24]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>0</th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>0</th>
                    <td>0.996088</td>
                    <td>0.899782</td>
                    <td>0.474018</td>
                    <td>0.355677</td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>0.393186</td>
                    <td>0.411065</td>
                    <td>0.247293</td>
                    <td>0.073719</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>0.016501</td>
                    <td>0.472189</td>
                    <td>0.438220</td>
                    <td>0.065040</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>0.630939</td>
                    <td>0.642452</td>
                    <td>0.808070</td>
                    <td>0.154420</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[25]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">pd</span><span class="o">.</span><span class="n">DataFrame</span><span class="p">(</span><span class="n">arr</span><span class="p">,</span> <span class="n">columns</span><span class="o">=</span><span class="p">[</span><span class="s1">&#39;A&#39;</span><span class="p">,</span> <span class="s1">&#39;B&#39;</span><span class="p">,</span> <span class="s1">&#39;C&#39;</span><span class="p">,</span> <span class="s1">&#39;D&#39;</span><span class="p">])</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[25]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                    <th>D</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>0</th>
                    <td>0.996088</td>
                    <td>0.899782</td>
                    <td>0.474018</td>
                    <td>0.355677</td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>0.393186</td>
                    <td>0.411065</td>
                    <td>0.247293</td>
                    <td>0.073719</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>0.016501</td>
                    <td>0.472189</td>
                    <td>0.438220</td>
                    <td>0.065040</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>0.630939</td>
                    <td>0.642452</td>
                    <td>0.808070</td>
                    <td>0.154420</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Na temat indeksowania czy wybierania wycinków tabel _DataFrame_ powiemy sobie dużo więcej w kolejnym wpisie. Tutaj jedynie chciałbym przybliżyć najprostszy sposób pobierania oraz tworzenia i usuwania kolumn.

Jak zobaczyliśmy wyżej, jednym z najprostszych sposobów tworzenia _DataFrames_ jest przekazanie do konstruktora słownika, który jako wartości zawiera _Series_. Również, gdy chcemy operować na kolumnach, możemy w uproszczeniu myśleć o nich jak o elementach słownika.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[26]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[26]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div> 
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>fst</th>
                    <th>snd</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>a</th>
                    <td>0.891356</td>
                    <td>0.662332</td>
                  </tr>
                  <tr>
                    <th>b</th>
                    <td>0.861472</td>
                    <td>0.204189</td>
                  </tr>
                  <tr>
                    <th>c</th>
                    <td>0.080433</td>
                    <td>0.562178</td>
                  </tr>
                  <tr>
                    <th>d</th>
                    <td>NaN</td>
                    <td>0.876908</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Pobieranie pojedynczej kolumny z _DataFrame_ znając jej nazwę, wygląda dokładnie tak samo, jak pobieranie wartości ze słownika na podstawie klucza.

> Wartość z **DataFrame** można również pobrać korzystając z metody odpowiadającej nazwie kolumny, dla poniższego przypadku będzie to:
>
> `df.fst`
>
> Każda kolumna ma przypisaną w namespace swoją nazwę do metody, taki zapis jednak może sprawiać problemy, gdy kolumny nazywają się podobnie lub nawet tak samo, jak wbudowane w DataFrame inne metody. Z tego też względu pozostaniemy przy zapisie podobnym do tego znanego ze słowników.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[27]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="p">[</span><span class="s1">&#39;fst&#39;</span><span class="p">]</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[27]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>a    0.891356
b    0.861472
c    0.080433
d         NaN
Name: fst, dtype: float64</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Tworzenie nowej kolumny zapisem także przypomina dodawanie elementu do słownika. Jako że kolumny możemy traktować jako _Series_, działania arytmetyczne na nich wykonywane są jak w _ndarray_ element po elemencie. Możemy więc dzięki temu tworzyć nowe kolumny jako wyniki operacji matematycznych na innych kolumnach, czy za pomocą funkcji uniwersalnych znanych z _NumPy_. Wystarczy tylko jako nazwę kolumny wybrać nazwę niewystępującą w liście `df.columns`.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[28]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="p">[</span><span class="s1">&#39;trd&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="n">df</span><span class="p">[</span><span class="s1">&#39;fst&#39;</span><span class="p">]</span> <span class="o">+</span> <span class="n">df</span><span class="p">[</span><span class="s1">&#39;snd&#39;</span><span class="p">]</span>
<span class="n">df</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[28]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div> 
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>fst</th>
                    <th>snd</th>
                    <th>trd</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>a</th>
                    <td>0.891356</td>
                    <td>0.662332</td>
                    <td>1.553687</td>
                  </tr>
                  <tr>
                    <th>b</th>
                    <td>0.861472</td>
                    <td>0.204189</td>
                    <td>1.065661</td>
                  </tr>
                  <tr>
                    <th>c</th>
                    <td>0.080433</td>
                    <td>0.562178</td>
                    <td>0.642611</td>
                  </tr>
                  <tr>
                    <th>d</th>
                    <td>NaN</td>
                    <td>0.876908</td>
                    <td>NaN</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Również usuwanie kolumn możemy wykonać dokładnie tak samo, jak w przypadku słowników _Python_.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[29]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="k">del</span> <span class="n">df</span><span class="p">[</span><span class="s1">&#39;trd&#39;</span><span class="p">]</span>
<span class="n">df</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[29]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div> 
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>fst</th>
                    <th>snd</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>a</th>
                    <td>0.891356</td>
                    <td>0.662332</td>
                  </tr>
                  <tr>
                    <th>b</th>
                    <td>0.861472</td>
                    <td>0.204189</td>
                  </tr>
                  <tr>
                    <th>c</th>
                    <td>0.080433</td>
                    <td>0.562178</td>
                  </tr>
                  <tr>
                    <th>d</th>
                    <td>NaN</td>
                    <td>0.876908</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Nic nie stoi na przeszkodzie, aby utworzyć kolumnę zawierającą ciąg tych samych wartości. Wystarczy do nowo utworzonej kolumny przekazać tę właśnie wartość. Jej długość zostanie dostosowana do długości _DataFrame_.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[30]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="p">[</span><span class="s1">&#39;ones&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="mf">1.0</span>
<span class="n">df</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[30]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div> 
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>fst</th>
                    <th>snd</th>
                    <th>ones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>a</th>
                    <td>0.891356</td>
                    <td>0.662332</td>
                    <td>1.0</td>
                  </tr>
                  <tr>
                    <th>b</th>
                    <td>0.861472</td>
                    <td>0.204189</td>
                    <td>1.0</td>
                  </tr>
                  <tr>
                    <th>c</th>
                    <td>0.080433</td>
                    <td>0.562178</td>
                    <td>1.0</td>
                  </tr>
                  <tr>
                    <th>d</th>
                    <td>NaN</td>
                    <td>0.876908</td>
                    <td>1.0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Wszystkie omawiane wyżej sposoby dodawania kolumn powodują dodanie nowej kolumny jako ostatniej w _DataFrame_. Gdy jednak chcemy, aby kolumna znalazła się w innym miejscu, możemy skorzystać z metody `pd.DataFrame.insert()`, która przyjmuje trzy podstawowe argumenty:

- miejsce, w którym kolumna ma zostać wstawiona (rozumiane jako indeks w tabeli `df.columns`);
- nazwę kolumny;
- zawartość kolumny.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[31]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">insert</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="s1">&#39;zero&#39;</span><span class="p">,</span> <span class="p">[</span><span class="mi">1</span><span class="p">,</span> <span class="mi">2</span><span class="p">,</span> <span class="mi">3</span><span class="p">,</span> <span class="mi">4</span><span class="p">])</span>
<span class="n">df</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[31]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div> 
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>zero</th>
                    <th>fst</th>
                    <th>snd</th>
                    <th>ones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>a</th>
                    <td>1</td>
                    <td>0.891356</td>
                    <td>0.662332</td>
                    <td>1.0</td>
                  </tr>
                  <tr>
                    <th>b</th>
                    <td>2</td>
                    <td>0.861472</td>
                    <td>0.204189</td>
                    <td>1.0</td>
                  </tr>
                  <tr>
                    <th>c</th>
                    <td>3</td>
                    <td>0.080433</td>
                    <td>0.562178</td>
                    <td>1.0</td>
                  </tr>
                  <tr>
                    <th>d</th>
                    <td>4</td>
                    <td>NaN</td>
                    <td>0.876908</td>
                    <td>1.0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Rozdział ten nie wyczerpuje oczywiście tematu powstawania obiektów _Pandas_, jeszcze w tym wpisie omówimy tworzenie _DataFrames_ na podstawie lokalnych plików w różnych, popularnych formatach. W kolejnych wpisach zostaną też przedstawione bardziej zoptymalizowane metody tworzenia wycinków czy przetwarzania danych w _Pandas_.

## Prezentacja danych

Zanim zaczniemy zajmować się większymi tabelami, gdzie niemożliwe jest wyświetlenie całości na ekranie komputera w czytelny sposób, wart opisać pokrótce sposoby prezentacji fragmentów danych. Dwie podstawowe metody służące do tego to `df.head()` i `df.tail()`. Jak wskazują nazwy pierwsza z nich, zwraca górę tabeli ('head'), a druga dół ('tail'), czyli ostatnie wiersze. W obu z nich możemy zdefiniować, ile wierszy ma zostać zwróconych, przekazując do metody ich liczbę jako parametr. Gdy nie przekażemy nic, zostanie zwróconych, odpowiednio pięć pierwszych bądź ostatnich wierszy.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[32]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">DataFrame</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">rand</span><span class="p">(</span><span class="mi">8</span><span class="p">,</span> <span class="mi">4</span><span class="p">),</span> <span class="n">columns</span><span class="o">=</span><span class="nb">list</span><span class="p">(</span><span class="s1">&#39;ABCD&#39;</span><span class="p">))</span></pre></div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[33]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">head</span><span class="p">()</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[33]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div> 
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                    <th>D</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>0</th>
                    <td>0.931382</td>
                    <td>0.932909</td>
                    <td>0.707267</td>
                    <td>0.838872</td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>0.245372</td>
                    <td>0.989694</td>
                    <td>0.761508</td>
                    <td>0.175945</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>0.669344</td>
                    <td>0.239195</td>
                    <td>0.043260</td>
                    <td>0.156429</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>0.076387</td>
                    <td>0.889954</td>
                    <td>0.459333</td>
                    <td>0.445329</td>
                  </tr>
                  <tr>
                    <th>4</th>
                    <td>0.758040</td>
                    <td>0.262711</td>
                    <td>0.831163</td>
                    <td>0.227569</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[34]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">tail</span><span class="p">(</span><span class="mi">3</span><span class="p">)</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[34]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div> 
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                    <th>D</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>5</th>
                    <td>0.901528</td>
                    <td>0.820576</td>
                    <td>0.417482</td>
                    <td>0.960585</td>
                  </tr>
                  <tr>
                    <th>6</th>
                    <td>0.328117</td>
                    <td>0.333883</td>
                    <td>0.813958</td>
                    <td>0.866697</td>
                  </tr>
                  <tr>
                    <th>7</th>
                    <td>0.476947</td>
                    <td>0.039930</td>
                    <td>0.325881</td>
                    <td>0.949937</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

## Odczytywanie danych z pliku

Ostatnim tematem poruszanym w tym wpisie jest tworzenie obiektów _DataFrame_ zaczytując do naszego programu dane z plików lokalnych. Możliwości czytania danych z plików w _Pandas_ jest bardzo dużo, my skupimy się jednak na trzech podstawowych i najprostszych formatach:

- .csv - pliki tekstowe z wartościami oddzielonymi przecinkiem
- .txt - również pliki textowe, ale z wartościami oddzielonymi znakiem tabulacji
- .xlsx - pliki _excel_

Zacznijmy od tych, które zwłaszcza na początku pracy z _data science_ będą pojawiać się najczęściej. Jest to format _.csv_, czyli _'comma separated values'_. Większość treningowych zbiorów danych, które można znaleźć w sieci, jest właśnie w tym formacie, stąd umiejętność wczytania tego typu danych do _DataFrame_ jest tak przydatna.

> Przykładowy zbiór danych, podobny do tego, z którego tu korzystamy, można znaleźć na stronie [www.kaggle.com](http://www.kaggle.com), a dokładnie [tutaj](https://www.kaggle.com/uciml/iris).
>
> Dodam, że strona ta jest świetnym źródłem przykładowych zbiorów danych i wiedzy na temat data science.

Aby pobrać zbiór danych w formacie _.csv_ z pliku, wystarczy do metody `pd.read_csv()` przekazać względną ścieżkę do tego pliku. W moim przypadku znajduje się on w tym samym folderze co plik _jupyter notbooka_, do którego go zaczytuje. Jeśli plik jest rzeczywiście tekstem oddzielonym przecinkami, nie musimy robić nic więcej.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[35]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df_csv</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">read_csv</span><span class="p">(</span><span class="s1">&#39;iris.csv&#39;</span><span class="p">)</span>
<span class="n">df_csv</span><span class="o">.</span><span class="n">head</span><span class="p">()</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[35]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>sepal_length</th>
                    <th>sepal_width</th>
                    <th>petal_length</th>
                    <th>petal_width</th>
                    <th>species</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>0</th>
                    <td>5.1</td>
                    <td>3.5</td>
                    <td>1.4</td>
                    <td>0.2</td>
                    <td>setosa</td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>4.9</td>
                    <td>3.0</td>
                    <td>1.4</td>
                    <td>0.2</td>
                    <td>setosa</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>4.7</td>
                    <td>3.2</td>
                    <td>1.3</td>
                    <td>0.2</td>
                    <td>setosa</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>4.6</td>
                    <td>3.1</td>
                    <td>1.5</td>
                    <td>0.2</td>
                    <td>setosa</td>
                  </tr>
                  <tr>
                    <th>4</th>
                    <td>5.0</td>
                    <td>3.6</td>
                    <td>1.4</td>
                    <td>0.2</td>
                    <td>setosa</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Gdy jednak chcemy zaczytać dane z pliku tekstowego _.txt_, musimy mieć pewność, czym oddzielone są od siebie poszczególne wartości. Zazwyczaj jest to znak tabulacji. Takie dane również zaczytujemy metodą `pd.read_csv()`, z tą jednak różnicą, że musimy przekazać parametr _delimiter='\t'_, gdzie _'\t'_ oznacza właśnie znak tabulacji.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[36]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df_txt</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">read_csv</span><span class="p">(</span><span class="s1">&#39;iris.txt&#39;</span><span class="p">,</span> <span class="n">delimiter</span><span class="o">=</span><span class="s1">&#39;</span><span class="se">\t</span><span class="s1">&#39;</span><span class="p">)</span>
<span class="n">df_txt</span><span class="o">.</span><span class="n">head</span><span class="p">()</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[36]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div> 
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>sepal_length</th>
                    <th>sepal_width</th>
                    <th>petal_length</th>
                    <th>petal_width</th>
                    <th>species</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>0</th>
                    <td>5.1</td>
                    <td>3.5</td>
                    <td>1.4</td>
                    <td>0.2</td>
                    <td>setosa</td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>4.9</td>
                    <td>3.0</td>
                    <td>1.4</td>
                    <td>0.2</td>
                    <td>setosa</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>4.7</td>
                    <td>3.2</td>
                    <td>1.3</td>
                    <td>0.2</td>
                    <td>setosa</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>4.6</td>
                    <td>3.1</td>
                    <td>1.5</td>
                    <td>0.2</td>
                    <td>setosa</td>
                  </tr>
                  <tr>
                    <th>4</th>
                    <td>5.0</td>
                    <td>3.6</td>
                    <td>1.4</td>
                    <td>0.2</td>
                    <td>setosa</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Ostatnim formatem, który chcemy tu omówić, są pliki programu _Excel_. _Pandas_ posiada dedykowaną dla nich metodę, mianowicie `pd.read_excel()`. Podobnie jak w powyższej metodzie, musimy przekazać względną ścieżkę do pliku, a do tego nazwę arkusza, z którego zaczytać dane, gdyż jak wiemy, plik _.xlsx_ może mieć wiele arkuszy z tabelarycznymi danymi.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[37]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df_xls</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">read_excel</span><span class="p">(</span><span class="s1">&#39;iris.xlsx&#39;</span><span class="p">,</span> <span class="n">sheet_name</span><span class="o">=</span><span class="s1">&#39;Sheet1&#39;</span><span class="p">)</span>
<span class="n">df_xls</span><span class="o">.</span><span class="n">head</span><span class="p">()</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[37]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>sepal_length</th>
                    <th>sepal_width</th>
                    <th>petal_length</th>
                    <th>petal_width</th>
                    <th>species</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>0</th>
                    <td>5.1</td>
                    <td>3.5</td>
                    <td>1.4</td>
                    <td>0.2</td>
                    <td>setosa</td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>4.9</td>
                    <td>3.0</td>
                    <td>1.4</td>
                    <td>0.2</td>
                    <td>setosa</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>4.7</td>
                    <td>3.2</td>
                    <td>1.3</td>
                    <td>0.2</td>
                    <td>setosa</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>4.6</td>
                    <td>3.1</td>
                    <td>1.5</td>
                    <td>0.2</td>
                    <td>setosa</td>
                  </tr>
                  <tr>
                    <th>4</th>
                    <td>5.0</td>
                    <td>3.6</td>
                    <td>1.4</td>
                    <td>0.2</td>
                    <td>setosa</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Przy odczycie z plików _Excel_ możemy napotkać na błąd związany z nieposiadaniem w naszej instalacji _Pythona_ silnika niezbędnego do odczytu plików _.xlsx_ i podobnych. Komunikat o błędzie poinformuje nas jakiego pakietu brakuje, u mnie było to _xlrd_. Wystarczy ten pakiet doinstalować za pomocą _pip_ i nie powinniśmy mieć już żadnych problemów z odczytywaniem tego typu danych.

```bash
pip install xlrd
```

Skoro możemy odczytywać pliki _Pandas_ daje nam również możliwość zapisu danych do plików. Często używamy tego, aby zapisać wynikowe datasety, bądź tylko _checkpointy_, do których możemy wrócić, gdy coś pójdzie nie tak w naszym przetwarzaniu.

Do zapisu plików tekstowych będziemy używać `pd.to_csv()`, wystarczy do metody przekazać nazwę pliku, który chcemy utworzyć. Gdy dodamy samą nazwę, plik zostanie utworzony w tym samym folderze, co nasz program (w tym wypadku _jupyter notebook_). Automatycznie metoda zapisze plik rozdzielony przecinkami. Aby nadpisać tę opcję, musimy przekazać w parametrze _sep_, czym wartości mają być rozdzielone.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[38]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df_csv</span><span class="o">.</span><span class="n">to_csv</span><span class="p">(</span><span class="s1">&#39;iris2.csv&#39;</span><span class="p">,</span> <span class="n">index</span><span class="o">=</span><span class="kc">False</span><span class="p">)</span></pre></div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[39]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df_txt</span><span class="o">.</span><span class="n">to_csv</span><span class="p">(</span><span class="s1">&#39;iris2.txt&#39;</span><span class="p">,</span> <span class="n">sep</span><span class="o">=</span><span class="s1">&#39;</span><span class="se">\t</span><span class="s1">&#39;</span><span class="p">,</span> <span class="n">index</span><span class="o">=</span><span class="kc">False</span><span class="p">)</span></pre></div>
        </div>
      </div>
    </div>
  </div>
</div>

Aby _Pandas_ nie dodał do naszego zbioru danych kolumny z indeksami na początku, musimy zdefiniować to w parametrze _index=False_.

## Podsumowanie

Pierwszy wpis na temat pakietu _Pandas_ uważam za zakończony. Omówiliśmy sposoby tworzenia tabel i serii na podstawie innych struktur danych znanych _Pythona_ bądź z _NumPy_, ale również na podstawie danych z lokalnych plików. W kolejnych wpisach poznamy metody przetwarzania danych, które udostępnia nam _Pandas_, oraz bardziej zaawansowane struktury danych, jak _Index_, _MultiIndex_, _TimeSeries_, czy _Pivot Tables_.
