#set page(
  width: 21cm,
  height: auto,
  margin: (x: 2cm, y: 2cm),
  fill: none
)

#set text(
  font: "New Computer Modern", 
  size: 12pt
)
#set text(font: "New Computer Modern", size: 12pt)

= What is CatBoost ?

During one of my internship, I had to build a model to forecast something based on many categories. I fund about CatBoost and tried it and it turned out really well. Here's a little introduction to what catboost is.

\

CatBoost (Categorical Boosting) emerged from the recognition that traditional gradient boosting algorithms, while powerful, face significant challenges when dealing with #underline[categorical features]. Developed by Yandex researchers, CatBoost was specifically designed to address the inherent limitations of existing boosting implementations when handling categorical variables which is a common scenario in real-world applications such as e-commerce, finance, and recommendation systems.

\

Traditional gradient boosting libraries like XGBoost and LightGBM require manual preprocessing of categorical features, typically through #underline[label] #underline[encoding] or #underline[one-hot encoding]. One-Hot Encoding is a technique which transforms categorical variables into binary columns. For example RGB could be encoded as a dictionary where Red : [1,0,0], Blue : [0,1,0] and Green : [0,0,1]. Label encoding would transform variables into unique integers. However, these approaches often lead to #underline[Dimensionality explosion] and #underline[Target leakage]. Sometimes, the mean of a category can be used for encoding (Target Statistic).

\

CatBoost distinguishes itself by providing native support for categorical features with the #underline[cat_features] parameter, eliminating the need for manual preprocessing.

\

CatBoost also represents a significant advancement in gradient boosting methodology, addressing fundamental issues present in traditional implementations. The algorithm introduces two critical innovations: #underline[ordered boosting] and #underline[ordered target statistics], both designed to combat prediction shift caused by target leakage.

\

== The Target Leakage Problem

\

Traditional gradient boosting algorithms suffer from a subtle but critical issue known as #underline[conditional shift] or #underline[prediction shift]. When computing gradients at iteration $m$, conventional methods use the same data points to both fit the model $F_(m-1)$ and compute the gradient:

$ g_i^((m)) = (partial L(y_i, F_(m-1)(x_i)))/(partial F_(m-1)(x_i)) $

This creates a dependency between the gradient computation and the model prediction on the same data point, leading to #underline[overfitting] and biased gradient estimates. The mathematical consequence is that
$bb(E)[g_i^((m)) | x_i] != bb(E)[g_i^((m))]$,
introducing bias in the boosting process. Indeed the expected value of the unbiased gradient is different from the one of the biased gradient.

\

== Ordered Boosting Solution

\

CatBoost addresses this issue through ordered boosting, which maintains multiple models $M_r$ for different permutations $sigma_r$ of the training data. For each sample $x_i$, the gradient is computed using a model trained only on data points that appear before $i$ in the permutation:

$ g_i^((m)) = (partial L(y_i, M_r^((m-1))(x_i)))/(partial M_r^((m-1))(x_i)) $

where $M_r^((m-1))$ is trained using only samples ${x_j : sigma_r(j) < sigma_r(i)}$.

Conceptually, CatBoost can be seen as maintaining multiple models corresponding to different permutations, although in practice this is implemented efficiently without explicitly training independent models. This ensures unbiased gradient estimation:

$ bb(E)[g_i^((m)) | x_i] = bb(E)[g_i^((m))] $

To be clear, we use permutations to ensure that for each data points, the gradient is computed with a model which was not trained on this specific point.

\

== Ordered Target Statistics

\

The traditional approach to encoding categorical variables is replacing each category with the mean target value for that category named Target statistic as mentioned earlier. For a categorical variable with values A, B, C, we calculate:

$ hat(x)_i^k = (sum_(j=1)^n bb(I)[x_j^k = x_i^k] dot y_j + alpha dot p)/(sum_(j=1)^n bb(I)[x_j^k = x_i^k] + alpha) $

Where:
- $x_j^k$ is the value of feature $k$ for sample $j$
- $bb(I)[x_j^k = x_i^k]$ equals 1 when the category matches
- $alpha$ is a smoothing parameter
- $p$ is the global mean of the target variable

This approach creates target leakage because each observation's encoding includes its own target value.

\

CatBoost solves this problem with Ordered Target Statistics, using only information from previous observations in a random permutation:

$ hat(x)_i^k = (sum_(j: sigma(j) < sigma(i)) bb(I)[x_j^k = x_i^k] dot y_j + alpha dot p)/(sum_(j: sigma(j) < sigma(i)) bb(I)[x_j^k = x_i^k] + alpha) $

Permutation is a great trick in gradient boosting algorithms.

\

== CatBoost's Oblivious Trees

\

CatBoost implements a specialized tree structure called Oblivious Trees, which differ significantly from standard decision trees:

- #underline[Uniform splitting condition]: Unlike standard decision trees, where different nodes can split on different conditions, Oblivious Trees apply the same splitting condition across all nodes at the same depth of the tree.
- #underline[Speed and simplicity]: This symmetrical structure produces simpler trees that are faster to train, as the algorithm only needs to determine one optimal split condition per level.
- #underline[Inherent regularization]: By forcing all nodes at the same depth to use identical split conditions, Oblivious Trees introduce a regularization effect that helps prevent overfitting.

This architectural choice contributes to CatBoost's performance advantages, particularly in terms of training speed and resistance to overfitting on heterogeneous data with many categorical features.

\

== Conclusion

\

As we have seen, CatBoost is fundamentally a gradient boosting algorithm that builds an ensemble of decision trees. However, its innovative approach to handling categorical features sets it apart from other similar algorithms:

- For each tree in the ensemble, CatBoost generates a random permutation of the training data
- It calculates Ordered Target Statistics for categorical features based on this permutation
- The encoding for each observation uses only information from previous observations in the permutation
- For binary categorical variables, CatBoost simply maps the values to 0 and 1

Then CatBoost processes data as if it were arriving sequentially:

- Initially, all instances receive a prediction of zero, making residuals equal to the target values
- As training proceeds, each leaf's output is updated using residuals from previous samples in the same leaf
- By never using a sample's own target value for its prediction, CatBoost effectively prevents data leakage

\

Thus, CatBoost is great to create a pricing model due to its superior handling of categorical variables through Ordered Target Statistics. This capability is particularly valuable for smartphone price prediction, where numerous categorical features (brand, model, storage tier, ...) significantly influence valuation, allowing the model to capture complex category-based patterns without extensive preprocessing.
