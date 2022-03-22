class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.text :title
      t.string :image
      t.text :reason
      t.text :thoughts
      t.text :tech
      t.text :loadmap
      t.integer :day
      t.text :commitment
      t.string :link
      t.string :github
      t.text :how

      t.timestamps
    end
  end
end
