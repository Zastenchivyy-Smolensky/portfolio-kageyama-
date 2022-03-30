class AddColumnsToUsers < ActiveRecord::Migration[6.1]
  def change
    # add_reference :products, :user, foreign_key: true, after: :how
    add_reference :products, :user, foreign_key: true, after: :how

  end
end
