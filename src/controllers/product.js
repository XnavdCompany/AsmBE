import Product from "../model/product.js";

export const getProduct = async (req, res) => {
    try {
        const data = await Product.find()
        return res.send({
            message: "success",
            data,
        })
    } catch (err) {
        return res.send({
            message: err
        })
    }
}

export const getProductById = async (req, res) => {
    const id = req.params.id
    const data = await Product.findById(id)
    if (data) {
        res.send({
            message: "Success",
            data,
        })
    } else {
        res.status(404).send("Không tìm thấy sản phẩm")
    }
    res.end()
}

export const createProduct = async (req, res) => {
    try {
        const body = req.body
        const data = await Product.create(body)
        res.send({
            message: "Thêm mới thành công",
            data,
        })
    } catch (err) {
        return res.send({
            message: err
        })
    }
}

export const removeProduct = async (req, res) => {
    try {
        const data = await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Sản phẩm đã được xóa thành công",
            data,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
      const data = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!data) {
        return res.status(404).json({
          message: "Không tìm thấy sản phẩm",
        });
      }
      return res.status(200).json({
        message: "Sản phẩm đã được cập nhật thành công",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        message: error,
      });
    }
  };